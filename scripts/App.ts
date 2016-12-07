window.onload = () => {
    var app = new App();
};

export class App {
    private canvasHost: HTMLDivElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Array<Shape> = new Array<Shape>();
    private canvasWidth = 1024;
    private canvasHeight = 768;
    private scale = 2.0;
    private scaleMin = 0.1;
    private scaleMax = 5.0;
    private isCtrlKeyPressed = false;

    constructor() {
        this.initShapes();
        this.canvasHost = document.getElementById("canvasHost") as HTMLDivElement;
        this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d");
        this.canvasHost.onmousewheel = this.handleMouseWheel;
        document.onkeydown = this.ctrlCheck;
        document.onkeyup = this.ctrlCheck;
        requestAnimationFrame(this.render);
    }

    private ctrlCheck = (evt: KeyboardEvent): boolean => {
        if (evt.which === 17) {
            this.isCtrlKeyPressed = (evt.type === 'keydown') ? true : false;
            return false;
        }
        return try;
    }

    private handleMouseWheel = (evt: MouseWheelEvent): boolean => {
        var delta = evt.wheelDelta ? evt.wheelDelta/120 : evt.detail ? -evt.detail : 0;
        if (delta && this.isCtrlKeyPressed) {
            evt.preventDefault();
            this.zoom(delta, evt.pageX, evt.pageY);
            return false;
        }
        return true;
    }

    private zoom(amount: number, cx: number, cy: number): void {
        this.scale += amount * .25;
        this.scale = Math.max(this.scale, this.scaleMin);
        this.scale = Math.min(this.scale, this.scaleMax);
        console.log(`zoom:  ${this.scale}`)
    }

    private initShapes(): void {
        let x = 0;
        let width = 30;
        let height = 30;
        let spacing = 10;

        for (let i = 0; i < 25; i++) {
            let y: number = 0;
            for (let j = 0; j < 15; j++) {
                let shape = new Shape();
                shape.x = x;
                shape.y = y;
                shape.width = width;
                shape.height = height;
                shape.color = this.getRandomColor();
                y+= height + spacing;
                this.shapes.push(shape);
            }
            x += width + spacing;
        }
    }

    private updateCanvasSize(): void {        
        this.canvas.width = this.canvasWidth * this.scale;
        this.canvas.height = this.canvasHeight * this.scale;
    }

    private render = (): void  => {
        requestAnimationFrame(this.render);
        this.ctx.save();
        this.ctx.translate(0.5, 0.5);
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.updateCanvasSize();
        
        this.ctx.beginPath();
        this.ctx.rect(0,0,this.canvas.width - 2, this.canvas.height - 2);
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "white";
        this.ctx.lineWidth = 1;
        this.ctx.fill();
        this.ctx.stroke();
        
        this.ctx.scale(this.scale, this.scale);
        for (let shape of this.shapes) {
            this.ctx.beginPath();
            this.ctx.fillStyle = shape.color;
            this.ctx.rect(shape.x, shape.y, shape.width, shape.height);
            this.ctx.strokeStyle = "black";
            this.ctx.fill();
            this.ctx.stroke();
        }
        this.ctx.restore();
    }

    private getRandomColor(): string {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

class Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}