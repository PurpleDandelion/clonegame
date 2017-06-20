// 这是我们的玩家要躲避的敌人 
var Enemy = function(x, y, speed) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    var num = Math.floor(Math.random()*8);
    this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = -STONE_WIDTH;
        //每次虫子回到0重新出发的时候，height可变 (0~3)*83
        this.y = Math.floor(Math.random() * 3) * STONE_HEIGHT + 60;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//碰撞检测，在一定范围差类表示撞到;撞到之后，玩家重置
Enemy.prototype.checkCollisions = function() {
    let diffx = this.x - player.x;
    let diffy = this.y - player.y;

    if (Math.abs(diffx) < 50 && Math.abs(diffy) < 41 ) {
        player.y = PLAYER_INIT_POSY;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function(x, y, sx, sy) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
    this.speedx = sx;
    this.speedy = sy;
    this.timer = null;
    this.ismove = true;
}

Player.prototype.initPos = function () {
    this.y = PLAYER_INIT_POSY;
    this.x = PLAYER_INIT_POSX;
}

Player.prototype.update = function(dt) {
    //检测玩家到达河边，就恢复原位继续游戏
    clearTimeout(this.timer);
    let _this = this;
    if (_this.y < 0) {
        _this.ismove = false;
        this.timer = setTimeout(function () {
                _this.initPos();
                _this.ismove = true;
                _this.render();
        }, dt);
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    console.log(this.ismove);
    console.log(this.y);

    if (!this.ismove && this.y < 0) {
        return;
    }
    //差值
    var diff = 0;
    var border  = 0;
    switch (keyCode) {
        case 'left':
            diff = this.x - this.speedx;
            border = PLAYER_INIT_POSX - 2*this.speedx;
            if (diff >= border) {
                this.x = diff;
            }
            break;
        case 'up':
            diff = this.y - this.speedy;
            border = PLAYER_INIT_POSY - 4*this.speedy;
            // if (diff >= border) {
                this.y = diff;
            // }
            break;
        case 'right':
            diff = this.x + this.speedx;
            border= PLAYER_INIT_POSX + 2*this.speedx;
            if (diff <= border) {
                this.x = diff;
            }
            break;
        case 'down':
            diff = this.y + this.speedy;
            border = PLAYER_INIT_POSY;
            if (diff <= border) {
                this.y = diff;
            }
            break;
        default:
            break;
    }
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [],
    enemyCount = 5;
//定义石块的宽度和高度以及玩家的初始位置坐标x和y
const STONE_WIDTH = 101;
      STONE_HEIGHT = 83,
      PLAYER_INIT_POSX = 202,
      PLAYER_INIT_POSY = 405;
//初始化虫子的位置
for (let i = 0; i < enemyCount; i++) {
    let enemy = new Enemy(0, 60, 101);
    // if (i < 3) {
        // enemy.y += i*STONE_HEIGHT;
    // } else {
        // enemy.y += Math.floor(i/2)*STONE_HEIGHT;
    // }
    enemy.x += Math.floor(Math.random()*4 + 1) * STONE_WIDTH;
    enemy.speed *= (i + 1)/1.2;
    enemy.x += enemy.speed;
    allEnemies.push(enemy);
}

var player = new Player(PLAYER_INIT_POSX, PLAYER_INIT_POSY, STONE_WIDTH, STONE_HEIGHT);


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
