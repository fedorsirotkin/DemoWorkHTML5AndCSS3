function draw() {
    // Получение элемента и его графического контекста
    var canvas = document.getElementById('canvas_1');
    var context = canvas.getContext('2d');

    // Создание пути
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(200, 200);

    // Черчение линии на холсте
    context.stroke();

    // Получение элемента и его графического контекста
    var canvas = document.getElementById('canvas_2');
    var context = canvas.getContext('2d');

    // Cохраняем копию текущего состояния контекста
    context.save();

    // Переносим графический контекст вправо и вниз
    context.translate(100, 100);

    // Рисуем линию
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(100, 100);
    context.stroke();

    // Восстанавливаем прежнее состояние контекста
    context.restore();

    // Получение элемента и его графического контекста
    var canvas = document.getElementById('canvas_3');
    var context = canvas.getContext('2d');

    context.save();
    context.translate(100, 100);

    // Начало пути.
    context.beginPath();
    
    // Прорисовка линни от точки (0, 100) к началу пути
    context.moveTo(0, 0);
    context.lineTo(100, 0);
    context.lineTo(100, 100);
    context.lineTo(0, 100);
    context.closePath();

    // Прорисовка контура полученного пути
    context.stroke();

    // Восстанавливаем прежнее состояние контекста
    context.restore();

    // Получение элемента и его графического контекста
    var canvas = document.getElementById('canvas_4');
    var context = canvas.getContext('2d');
    context.save();
    context.translate(100, 100);

    // Начало пути
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(100, 0);
    context.lineTo(100, 100);
    context.lineTo(0, 100);
    context.closePath();

    // Настройка стилей линии
    context.lineWidth = 8;
    context.strokeStyle = 'green';
    context.lineJoin = 'bevel';

    // Прорисовка контура полученного пути
    context.stroke();

    // Восстанавливаем прежнее состояние контекста
    context.restore();

    // Получение элемента и его графического контекста
    var canvas = document.getElementById('canvas_5');
    var context = canvas.getContext('2d');

    context.save();
    context.translate(100, 100);

    // Начало пути
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(100, 0);
    context.lineTo(100, 100);
    context.lineTo(0, 100);
    context.closePath();

    // Настройка стиля заливки
    context.fillStyle = "blue";
    context.fill();

    // Настройка стилей линии
    context.lineWidth = 8;
    context.strokeStyle = "rgba(100, 100, 100, 1)";
    context.lineJoin = "round";
    context.stroke();

    // Восстанавливаем прежнее состояние контекста
    context.restore();


    // Получение элемента и его графического контекста
    var canvas = document.getElementById('canvas_6');
    var context = canvas.getContext('2d');

    // Заполнение прямоугольной области синим цветом
    context.fillStyle = "blue";
    context.fillRect(100, 100, 50, 50);

    // Вычерчивание красной границы толщиной в 10 пикселей
    context.strokeStyle = "red";
    context.lineWidth = 10;
    context.strokeRect(100, 100, 50, 50);

    // Очистка прямоугольной области от контента
    context.clearRect(125, 125, 35, 35);


    // Получение элемента и его графического контекста
    var canvas = document.getElementById('canvas_7');
    var context = canvas.getContext('2d');

    // первая точка
    context.moveTo(0, 100);
    context.quadraticCurveTo(/*управляющая точка*/50, 0, /*вторая точка*/100, 100);
    context.lineWidth = 3;
    context.strokeStyle = "red";
    context.stroke();

}

// Функция которая рисует прямоугольник
// первый параметр - объект определяющий размеры прямоугольника
// второй параметр - контекст канваса на котором будет произведено рисование 
function drawRectangle(rect, context) {
    context.beginPath();
    context.rect(rect.x, rect.y, rect.width, rect.height);
    context.fillStyle = 'blue';
    context.fill();
    context.lineWidth = rect.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
}

function animate(rect, canvas, context, startTime) {

    // Определяем разницу между текущим временем и временем начала анимации.
    var time = (new Date()).getTime() - startTime;
    var linearSpeed = 100;

    // pixels / second
    var newX = linearSpeed * time / 1000;

    // Меняем свойство x объекта прямоугольника до тех пор пока он не дойдет до правого края канваса.
    if (newX < canvas.width - rect.width - rect.borderWidth / 2) {
        rect.x = newX;
    }
    
    // Очищаем канвас
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем прямоугольник с учетом измененной координаты x
    drawRectangle(rect, context);

    // Запрашиваем новый фрейм
    requestFrame(function () {
        animate(rect, canvas, context, startTime);
    });

    if (newX >= canvas.width) {
        return;
    }

}

jQuery(document).ready(function () {
    jQuery('.btntop').click(function (e) {
        jQuery('html, body').animate({scrollTop: 0}, '1000');
        e.preventDefault();
    });
    jQuery(window).scroll(function () {
        if (jQuery(this).scrollTop() > 300) {
            jQuery('.btntop').fadeIn('2000');
        } else {
            jQuery('.btntop').fadeOut('500');
        }
    });

    if (window.location.href.indexOf('canvas.html') >= 0) {
        draw();

        // https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
        // requestAnimationFrame - метод, который указывает браузеру что наш код хочет выполнить анимацию 
        // и запрашивает вызов callback функции перед следующей перерисовкой.
        window.requestFrame = function (callback) {
            // переменная f будет содержать ту функцию, для запроса отрисовки одного кадра, которую поддерживает текущий браузер.
            var f = window.mozRequestAnimationFrame ||
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    function (callback) {
                        window.setTimeout(callback, 500);
                    }
            f(callback);
        };

        var canvas = document.getElementById('canvas_animate');
        var context = canvas.getContext('2d');

        var rect = {
            x: 0,
            y: 75,
            width: 100,
            height: 50,
            borderWidth: 2
        };
        drawRectangle(rect, context);
        animate(rect, canvas, context, new Date().getTime());
    }
});