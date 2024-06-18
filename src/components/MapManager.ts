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
  activeShape?: Konva.Shape;
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

    let ratio = 1;

    if (this.image.naturalWidth > window.innerWidth) {
      ratio = window.innerWidth / this.image.naturalWidth;
      this.stage.getLayers()[0].scale({ x: ratio, y: ratio });
    }

    if (imageHeight * ratio < window.innerHeight) {
      this.stage.height(imageHeight * ratio);
    }

    this.addShapes();
  };

  addShapes() {
    this.areas
      .sort((a, b) => {
        return a.shape === 'circle' ? 1 : -1;
      })
      .forEach(({ id, shape, coords }) => {
        if (shape === 'poly') {
          const poly = new Konva.Line({
            id,
            points: coords,
            offsetY: 64,
            closed: true,
          });

          poly.on('tap click', this.handleShapeClick);

          this.layer.add(poly);
        }
        if (shape === 'circle') {
          const circle = new Konva.Circle({
            id,
            x: coords[0],
            y: coords[1],
            radius: coords[2] + 2,
            strokeEnabled: true,
            offsetY: 64,
          });

          circle.on('tap click', this.handleShapeClick);

          this.layer.add(circle);
        }
      });
  }

  handleShapeClick = (e: KonvaEventObject<TouchEvent>) => {
    if (this.activeShape) {
      this.activeShape.fill('transparent');
      this.activeShape.opacity(1);
      this.activeShape.stroke('none');
      this.activeShape.strokeWidth(0);
    }
    if (this.onAreaClick) {
      this.activeShape = e.target as Konva.Shape;
      this.activeShape.fill('#fff');
      this.activeShape.opacity(0.3);
      this.activeShape.stroke('black');
      this.activeShape.strokeWidth(2);
      this.onAreaClick({ id: Number(this.activeShape.id()) });
    }
  };

  handleTouchMove = (e: KonvaEventObject<TouchEvent>) => {
    e.evt.preventDefault();
    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];

    const stage = this.stage;

    if (stage.scaleX() <= 1) {
      stage.stopDrag();
    }

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

      var scale = Math.max(stage.scaleX() * (dist / this.lastDist), 1);

      stage.scaleX(scale);
      stage.scaleY(scale);

      // calculate new position of the stage
      var dx = newCenter.x - this.lastCenter.x;
      var dy = newCenter.y - this.lastCenter.y;

      var newPos = {
        x: Math.min(newCenter.x - pointTo.x * scale + dx, 0),
        y: Math.min(newCenter.y - pointTo.y * scale + dy, 0),
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
