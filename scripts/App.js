System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var App, Shape;
    return {
        setters:[],
        execute: function() {
            window.onload = function () {
                var app = new App();
            };
            App = (function () {
                function App() {
                    var _this = this;
                    this.shapes = new Array();
                    this.canvasWidth = 1024;
                    this.canvasHeight = 768;
                    this.scale = 2.0;
                    this.scaleMin = 0.1;
                    this.scaleMax = 5.0;
                    this.isCtrlKeyPressed = false;
                    this.ctrlCheck = function (evt) {
                        if (evt.which === 17) {
                            _this.isCtrlKeyPressed = (evt.type === 'keydown') ? true : false;
                            return false;
                        }
                        return ;
                        try { }
                        finally { }
                        ;
                    };
                    this.handleMouseWheel = function (evt) {
                        var delta = evt.wheelDelta ? evt.wheelDelta / 120 : evt.detail ? -evt.detail : 0;
                        if (delta && _this.isCtrlKeyPressed) {
                            evt.preventDefault();
                            _this.zoom(delta, evt.pageX, evt.pageY);
                            return false;
                        }
                        return true;
                    };
                    this.render = function () {
                        requestAnimationFrame(_this.render);
                        _this.ctx.save();
                        _this.ctx.translate(0.5, 0.5);
                        _this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
                        _this.updateCanvasSize();
                        _this.ctx.beginPath();
                        _this.ctx.rect(0, 0, _this.canvas.width - 2, _this.canvas.height - 2);
                        _this.ctx.strokeStyle = "black";
                        _this.ctx.fillStyle = "white";
                        _this.ctx.lineWidth = 1;
                        _this.ctx.fill();
                        _this.ctx.stroke();
                        _this.ctx.scale(_this.scale, _this.scale);
                        for (var _i = 0, _a = _this.shapes; _i < _a.length; _i++) {
                            var shape = _a[_i];
                            _this.ctx.beginPath();
                            _this.ctx.fillStyle = shape.color;
                            _this.ctx.rect(shape.x, shape.y, shape.width, shape.height);
                            _this.ctx.strokeStyle = "black";
                            _this.ctx.fill();
                            _this.ctx.stroke();
                        }
                        _this.ctx.restore();
                    };
                    this.initShapes();
                    this.canvasHost = document.getElementById("canvasHost");
                    this.canvas = document.getElementById("canvas");
                    this.ctx = this.canvas.getContext("2d");
                    this.canvasHost.onmousewheel = this.handleMouseWheel;
                    document.onkeydown = this.ctrlCheck;
                    document.onkeyup = this.ctrlCheck;
                    requestAnimationFrame(this.render);
                }
                App.prototype.zoom = function (amount, cx, cy) {
                    this.scale += amount * .25;
                    this.scale = Math.max(this.scale, this.scaleMin);
                    this.scale = Math.min(this.scale, this.scaleMax);
                    console.log("zoom:  " + this.scale);
                };
                App.prototype.initShapes = function () {
                    var x = 0;
                    var width = 30;
                    var height = 30;
                    var spacing = 10;
                    for (var i = 0; i < 25; i++) {
                        var y = 0;
                        for (var j = 0; j < 15; j++) {
                            var shape = new Shape();
                            shape.x = x;
                            shape.y = y;
                            shape.width = width;
                            shape.height = height;
                            shape.color = this.getRandomColor();
                            y += height + spacing;
                            this.shapes.push(shape);
                        }
                        x += width + spacing;
                    }
                };
                App.prototype.updateCanvasSize = function () {
                    this.canvas.width = this.canvasWidth * this.scale;
                    this.canvas.height = this.canvasHeight * this.scale;
                };
                App.prototype.getRandomColor = function () {
                    var letters = '0123456789ABCDEF';
                    var color = '#';
                    for (var i = 0; i < 6; i++) {
                        color += letters[Math.floor(Math.random() * 16)];
                    }
                    return color;
                };
                return App;
            }());
            exports_1("App", App);
            Shape = (function () {
                function Shape() {
                }
                return Shape;
            }());
        }
    }
});
//# sourceMappingURL=App.js.map