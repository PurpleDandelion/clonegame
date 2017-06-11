// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 60;
    this.speed = 101;
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    var num = Math.floor(Math.random()*8);
    this.speed = num * STONE_WIDTH * dt;
    this.x += this.speed;
    // this.y += Math.random() * STONE_WIDTH;

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
        player.y = 372;
    }
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.x = 202;
    this.y = 372;
    this.speedx = 101;
    this.speedy = 83;
}

Player.prototype.update = function() {
    //检测玩家到达河边，就恢复原位继续游戏
    // if (this.y === 400 - 4*this.speedy) {
    //     this.y = 400;
    // }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    //差值
    var diff = 0;
    var border  = 0;
    switch (keyCode) {
        case 'left':
            diff = this.x - this.speedx;
            border = 202 - 2*this.speedx;
            if (diff >= border) {
                this.x = diff;
            }
            break;
        case 'up':
            diff = this.y - this.speedy;
            border = 372 - 4*this.speedy;
            if (diff >= border) {
                this.y = diff;
            }
            break;
        case 'right':
            diff = this.x + this.speedx;
            border= 202 + 2*this.speedx;
            if (diff <= border) {
                this.x = diff;
            }
            break;
        case 'down':
            diff = this.y + this.speedy;
            border = 372;
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
    enemyCount = 3;
const STONE_WIDTH = 101;
const STONE_HEIGHT = 83;
for (let i = 0; i < enemyCount; i++) {
    let enemy = new Enemy();
    enemy.y += i*STONE_HEIGHT;
    enemy.x += Math.floor(Math.random()*4 + 1) * STONE_WIDTH;
    enemy.speed *= i;
    enemy.x += enemy.speed;
    allEnemies.push(enemy);
}

var player = new Player();


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
