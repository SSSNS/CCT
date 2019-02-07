import { ui } from "../../ui/layaMaxUI";

export default class IndexUI extends ui.test.IndexSceneUI{
    // /** @prop {name:intType, tips:"整数类型示例", type:Int, default:1000}*/
    // public intType: number = 1000;
    // /** @prop {name:numType, tips:"数字类型示例", type:Number, default:1000}*/
    // public numType: number = 1000;
    // /** @prop {name:strType, tips:"字符串类型示例", type:String, default:"hello laya"}*/
    // public strType: string = "hello laya";
    // /** @prop {name:boolType, tips:"布尔类型示例", type:Bool, default:true}*/
    // public boolType: boolean = true;

    /**设置单例的引用方式，方便其他类引用 */
    static instance: IndexUI;

    private prePos:Laya.Point;
    private speed:number = 400;// 移动速度(px/s)
    private minT:number = .1;// 最小移动时间(s)
    private isMoving:boolean = false;
    private moveHandler:number;
    private canChangeDir:boolean = true;// 是否能换方向
    
    constructor() { 
        super();
        IndexUI.instance = this;
     }
    
    onEnable(): void {
        this.onTapMap();
    }

    onDisable(): void {
    }

    /**
     * 点击地图
     */
    private onTapMap(){
        this.map.on(Laya.Event.MOUSE_DOWN, this, this.startMove);
    }

    /**
     * 开始移动
     */
    private startMove(e:any){
        this.map.offAll(Laya.Event.MOUSE_DOWN);
        this.setPrePos(e);
        this.map.on(Laya.Event.MOUSE_MOVE, this, this.setPrePos);
        this.map.on(Laya.Event.MOUSE_UP, this, this.finishMove);
        this.map.on(Laya.Event.MOUSE_OUT, this, this.finishMove);
    }

    /**
     * 设置预设点
     */
    private setPrePos(e:any){
        if(e && e.stageX && e.stageY){
            // 有移动
            var newPos:Laya.Point = new Laya.Point(e.stageX, e.stageY);
            if(!this.prePos || Laya.GrahamScan.dis(newPos, this.prePos) > 100){
                // 微小移动不记
                this.prePos = newPos;
                this.move();
            }
        }
    }

    /**
     * 结束移动
     */
    private finishMove(e:any){
        if(e && e.stageX && e.stageY){
            this.prePos = new Laya.Point(e.stageX, e.stageY);
            this.move(true);
        }
        this.map.offAll();
        this.onTapMap();
    }

    /**
     * 移动
     */
    private move(isFinal:boolean = false){
        var that = this;
        if(!this.prePos || (!isFinal && !this.canChangeDir)){
            return;
        }
        this.isMoving = true;
        var nowPos = new Laya.Point(this.player.x, this.player.y);
        var dis:number = Math.pow(Laya.GrahamScan.dis(nowPos, this.prePos), .5);
        if(dis > .1){
            // 移动时间
            var t = Math.ceil(1000 * dis / this.speed);
            Laya.Tween.clearAll(this.player);
            Laya.Tween.to(this.player, {x:this.prePos.x, y:this.prePos.y}, t, undefined, Laya.Handler.create(this, function(){
                this.isMoving = false;
            }))
            clearInterval(this.moveHandler);
            this.canChangeDir = false;
            this.moveHandler = setTimeout(function(){
                that.canChangeDir = true;
            }, Math.floor(1000 * this.minT));
        }
    }
}