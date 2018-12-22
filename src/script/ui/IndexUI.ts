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
    
    constructor() { 
        super();
        IndexUI.instance = this;
     }
    
    onEnable(): void {
        this.createBtn.on(Laya.Event.CLICK, this, this.showLog.bind(this, "createBtn"));
        this.advanceBtn.on(Laya.Event.CLICK, this, this.showLog.bind(this, "advanceBtn"));
    }

    onDisable(): void {
    }

    /** 显示一下 */
    showLog(text:string):void {
        console.log("当前点击了", text);
    }
}