import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';
import type { Area } from '@/types/Area';

interface Point {
  x: number;
  y: number;
}

export class MapManager {
  stage: Konva.Stage;
  layer: Konva.Layer;
  layerImg?: Konva.Image;
  image: HTMLImageElement;
  lastCenter: null | Point = null;
  lastDist = 0;
  areas: Area[];
  onAreaClick?: ({ id }: { id: number }) => void;

  constructor({
    containerEl,
    imgUrl,
    areas,
  }: {
    containerEl: string;
    imgUrl: string;
    areas: MapManager['areas'];
  }) {
    Konva.hitOnDragEnabled = true;
    this.stage = new Konva.Stage({
      container: containerEl,
      width: window.innerWidth,
      height: window.innerHeight,
      draggable: true,
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.stage.on('touchmove', this.handleTouchMove);
    this.stage.on('touchend', this.handleTouchEnd);
    this.image = new Image();
    this.image.addEventListener('load', this.loadCanvasImage);
    this.image.src = imgUrl;
    this.areas = areas;
  }

  loadCanvasImage = () => {
    const imageHeight = this.image.naturalHeight - 64 * 2;

    this.layerImg = new Konva.Image({
      x: 0,
      y: 0,
      width: this.image.naturalWidth,
      height: imageHeight,
      image: this.image,
    });

    this.layerImg.crop({
      x: 0,
      y: 64,
      height: imageHeight,
      width: this.image.naturalWidth,
    });
    this.layer.add(this.layerImg);

    if (this.image.naturalWidth < window.innerWidth) {
      this.stage.width(this.image.naturalWidth);
    }

    if (imageHeight < window.innerHeight) {
      this.stage.height(imageHeight);
    }

    if (this.image.naturalWidth > window.innerWidth) {
      const ratio = window.innerWidth / this.image.naturalWidth;
      this.stage.getLayers()[0].scale({ x: ratio, y: ratio });
    }

    this.addShapes();
  };

  addShapes() {
    this.areas.forEach(({ id, shape, coords }) => {
      if (shape === 'poly') {
        const poly = new Konva.Line({
          id,
          points: coords,
          offsetY: 64,
          closed: true,
        });

        poly.on('tap click', (el) => {
          if (this.onAreaClick) {
            this.onAreaClick({ id: Number(el.target.id()) });
          }
        });

        this.layer.add(poly);
      }
      if (shape === 'circle') {
        const circle = new Konva.Circle({
          id,
          x: coords[0],
          y: coords[1],
          radius: coords[2],
          //   stroke: 'purple',
          offsetY: 64,
          //   strokeWidth: 5,
        });

        circle.on('tap click', (el) => {
          if (this.onAreaClick) {
            this.onAreaClick({ id: Number(el.target.id()) });
          }
        });

        this.layer.add(circle);
      }
    });
  }

  handleTouchMove = (e: KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault();
    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];

    const stage = this.stage;

    if (touch1 && touch2) {
      // if the stage was under Konva's drag&drop
      // we need to stop it, and implement our own pan logic with two pointers
      if (stage.isDragging()) {
        stage.stopDrag();
      }

      const p1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      const p2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      if (!this.lastCenter) {
        this.lastCenter = getCenter(p1, p2);
        return;
      }
      var newCenter = getCenter(p1, p2);

      var dist = getDistance(p1, p2);

      if (!this.lastDist) {
        this.lastDist = dist;
      }

      // local coordinates of center point
      var pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      };

      var scale = stage.scaleX() * (dist / this.lastDist);

      stage.scaleX(scale);
      stage.scaleY(scale);

      // calculate new position of the stage
      var dx = newCenter.x - this.lastCenter.x;
      var dy = newCenter.y - this.lastCenter.y;

      var newPos = {
        x: newCenter.x - pointTo.x * scale + dx,
        y: newCenter.y - pointTo.y * scale + dy,
      };

      stage.position(newPos);

      this.lastDist = dist;
      this.lastCenter = newCenter;
    }
  };

  handleTouchEnd = (e: KonvaEventObject<TouchEvent>) => {
    this.lastDist = 0;
    this.lastCenter = null;
  };
}

function getDistance(p1: Point, p2: Point) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1: Point, p2: Point) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}