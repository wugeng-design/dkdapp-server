import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sect, SectDocument } from './sect.schema';

@Injectable()
export class SectSeed implements OnModuleInit {
  constructor(@InjectModel(Sect.name) private sectModel: Model<SectDocument>) {}

  async onModuleInit() {
    const count = await this.sectModel.countDocuments();
    if (count === 0) {
      console.log('开始初始化派系数据...');
      await this.seedSects();
      console.log('派系数据初始化完成');
    }
  }

  private async seedSects() {
    const sects = [
      { name: '五斗米道', dynasty: '东汉', practice: '符箓', description: '五斗米道是道教的早期派别之一，由张道陵创立于东汉末年。入教者需缴纳五斗米，故得名五斗米道。教内设二十四治，以符水治病、靖室思过、劝善修道为主要活动。', info: [{ key: '修行方式', value: '符水治病、靖室思过、劝善修道' }, { key: '理念', value: '守戒积善、道即太上老君' }, { key: '经典', value: '《老子想尔注》' }, { key: '圣地', value: '鹤鸣山、龙虎山' }], representatives: ['张道陵', '张衡', '张鲁'] },
      { name: '太平道', dynasty: '东汉', practice: '符箓', description: '太平道是道教的早期派别之一，由张角创立于东汉末年。以《太平经》为理论基础，以符水咒说治病，发动黄巾起义，扩大了道教在底层社会的影响力。', info: [{ key: '修行方式', value: '符水咒说、治病救人' }, { key: '理念', value: '太平世、积善成仙、财物共养' }, { key: '经典', value: '《太平经》' }, { key: '圣地', value: '钜鹿' }], representatives: ['张角', '于吉'] },
      { name: '上清派', dynasty: '魏晋', practice: '存思', description: '上清派是道教的重要派别之一，以《上清经》为主要经典，强调存思守一的修炼方法。由魏华存创立，陶弘景发展壮大。', info: [{ key: '修行方式', value: '存思守一、服气内丹' }, { key: '理念', value: '上清道妙、存思成仙' }, { key: '经典', value: '《上清大洞真经》、《黄庭经》' }, { key: '圣地', value: '茅山、天台山' }], representatives: ['魏华存', '杨羲', '许谧', '陶弘景'] },
      { name: '灵宝派', dynasty: '魏晋', practice: '斋醮', description: '灵宝派是道教的重要派别之一，以《灵宝经》为主要经典，强调斋醮科仪的重要性。由葛玄创立，陆修静发展壮大。', info: [{ key: '修行方式', value: '斋醮科仪、符箓诵经' }, { key: '理念', value: '超度亡灵、积累功德' }, { key: '经典', value: '《灵宝无量度人上品妙经》' }, { key: '圣地', value: '阁皂山' }], representatives: ['葛玄', '葛洪', '陆修静'] },
      { name: '三皇派', dynasty: '魏晋', practice: '符箓', description: '三皇派是道教的重要派别之一，以《三皇经》为主要经典，注重符箓法术和炼丹修炼。', info: [{ key: '修行方式', value: '符箓法术、炼丹修炼' }, { key: '理念', value: '驱邪避凶、修道成仙' }, { key: '经典', value: '《三皇经》' }, { key: '圣地', value: '龙虎山' }], representatives: ['葛巢甫'] },
      { name: '楼观道', dynasty: '魏晋', practice: '内丹', description: '楼观道是道教的重要派别之一，以终南山为中心，奉老君和关令尹喜为祖师，传习《道德》《西升》等经典。', info: [{ key: '修行方式', value: '内丹修炼、符箓法术' }, { key: '理念', value: '清静无为、道法自然' }, { key: '经典', value: '《道德经》、《西升经》' }, { key: '圣地', value: '终南山楼观台' }], representatives: ['尹喜', '梁谌'] },
      { name: '茅山派', dynasty: '南北朝', practice: '符箓', description: '茅山派是道教的重要派别之一，以茅山为圣地，注重符箓法术和内丹修炼。由陶弘景发展壮大，是上清派的重要支派。', info: [{ key: '修行方式', value: '符箓法术、内丹修炼' }, { key: '理念', value: '济世度人、修道成仙' }, { key: '经典', value: '《真诰》、《登真隐诀》' }, { key: '圣地', value: '茅山' }], representatives: ['陶弘景', '王远知'] },
      { name: '天师道', dynasty: '隋唐', practice: '符箓', description: '天师道是道教的重要派别之一，由张道陵后裔传承，注重符箓法术和斋醮科仪。唐代得到统治者的尊崇，地位显赫。', info: [{ key: '修行方式', value: '符箓法术、斋醮科仪' }, { key: '理念', value: '守戒积善、道即太上老君' }, { key: '经典', value: '《老子想尔注》' }, { key: '圣地', value: '龙虎山' }], representatives: ['张道陵', '张衡', '张鲁'] },
      { name: '钟吕金丹派', dynasty: '唐代', practice: '内丹', description: '钟吕金丹派是道教的重要派别之一，由钟离权和吕洞宾创立，主张内丹修炼，强调性命双修。', info: [{ key: '修行方式', value: '内丹修炼、性命双修' }, { key: '理念', value: '金丹大道、得道成仙' }, { key: '经典', value: '《钟吕传道集》' }, { key: '圣地', value: '终南山' }], representatives: ['钟离权', '吕洞宾'] },
      { name: '金丹派南宗', dynasty: '北宋', practice: '内丹', description: '金丹派南宗是道教的重要派别之一，由张伯端创立，主张先命后性的内丹修炼方法，著有《悟真篇》。', info: [{ key: '修行方式', value: '内丹修炼、先命后性' }, { key: '理念', value: '性命双修、得道成仙' }, { key: '经典', value: '《悟真篇》' }, { key: '圣地', value: '天台' }], representatives: ['张伯端', '石泰', '薛道光', '陈楠', '白玉蟾'] },
      { name: '全真道', dynasty: '金代', practice: '清修', description: '全真道是道教的重要派别之一，由王重阳创立，主张三教合一、先性后命、出家清修，传北七真。', info: [{ key: '修行方式', value: '内丹修炼、出家清修' }, { key: '理念', value: '三教合一、先性后命、全真而仙' }, { key: '经典', value: '《道德经》、《般若心经》、《孝经》' }, { key: '圣地', value: '终南山、昆嵛山' }], representatives: ['王重阳', '丘处机', '马钰', '谭处端', '刘处玄', '王处一', '郝大通', '孙不二'] },
      { name: '太一道', dynasty: '金代', practice: '符箓', description: '太一道是道教的重要派别之一，由萧抱珍创立，重符箓斋醮，规定道士必须出家，七传以后逐渐与正一道相融合。', info: [{ key: '修行方式', value: '符箓斋醮、祈祷诃禁' }, { key: '理念', value: '太一三元、笃人伦、翊世教' }, { key: '经典', value: '《太一三元法箓》' }, { key: '圣地', value: '卫州' }], representatives: ['萧抱珍', '萧道熙'] },
      { name: '真大道', dynasty: '金代', practice: '清修', description: '真大道是道教的重要派别之一，由刘德仁创立，以清心寡欲、谦卑自守、力作而食为教旨，元以后逐渐衰落并消失。', info: [{ key: '修行方式', value: '清心寡欲、谦卑自守、力作而食' }, { key: '理念', value: '无为保正性命、无相驱役鬼神' }, { key: '经典', value: '《道德经》' }, { key: '圣地', value: '沧州' }], representatives: ['刘德仁', '陈师正'] },
      { name: '净明道', dynasty: '南宋', practice: '忠孝', description: '净明道是道教的重要派别之一，强调忠孝伦理，融合儒家思想与道教修炼。由许逊创立，刘玉发展壮大。', info: [{ key: '修行方式', value: '忠孝伦理、内丹修炼' }, { key: '理念', value: '净明忠孝、仙道合一' }, { key: '经典', value: '《净明忠孝全书》' }, { key: '圣地', value: '西山万寿宫' }], representatives: ['许逊', '刘玉', '黄元吉'] },
      { name: '神霄派', dynasty: '宋代', practice: '雷法', description: '神霄派是道教的重要派别之一，以内丹修炼为基础，结合雷法（呼召雷电之术），影响广泛。', info: [{ key: '修行方式', value: '内丹修炼、雷法' }, { key: '理念', value: '呼召雷电、驱邪治病' }, { key: '经典', value: '《神霄雷法》' }, { key: '圣地', value: '龙虎山' }], representatives: ['王文卿', '林灵素'] },
      { name: '清微派', dynasty: '宋代', practice: '雷法', description: '清微派是道教的重要派别之一，也以内丹为本，结合符箓雷法，强调"清微天"之炁。', info: [{ key: '修行方式', value: '内丹修炼、雷法' }, { key: '理念', value: '清微天炁、驱邪治病' }, { key: '经典', value: '《清微雷法》' }, { key: '圣地', value: '青城山' }], representatives: ['黄舜申', '李少微'] },
      { name: '天心派', dynasty: '宋代', practice: '符箓', description: '天心派是道教的重要派别之一，以传"天心正法"著称，注重符箓法术和斋醮科仪。', info: [{ key: '修行方式', value: '符箓法术、斋醮科仪' }, { key: '理念', value: '天心正法、驱邪治病' }, { key: '经典', value: '《天心正法》' }, { key: '圣地', value: '龙虎山' }], representatives: ['饶洞天', '路时中'] },
      { name: '龙门派', dynasty: '元代', practice: '清修', description: '龙门派是全真道的重要支派，由丘处机创立，强调严格的清修戒律和内丹修炼，是全真道中传承最广、影响最大的一派。', info: [{ key: '修行方式', value: '内丹修炼、清修戒律' }, { key: '理念', value: '功行双全、龙门心法' }, { key: '经典', value: '《邱祖全书》' }, { key: '圣地', value: '白云观、崂山' }], representatives: ['丘处机', '尹志平', '李志常'] },
      { name: '遇仙派', dynasty: '元代', practice: '清修', description: '遇仙派是全真道的重要支派，由马钰创立，主张"清净无为"。', info: [{ key: '修行方式', value: '清净无为、内丹修炼' }, { key: '理念', value: '遇仙得道、清净无为' }, { key: '经典', value: '《丹阳真人语录》' }, { key: '圣地', value: '宁海' }], representatives: ['马钰', '马丹阳'] },
      { name: '南无派', dynasty: '元代', practice: '清修', description: '南无派是全真道的重要支派，由谭处端创立，主张"清静无为"。', info: [{ key: '修行方式', value: '清静无为、内丹修炼' }, { key: '理念', value: '南无清静、得道成仙' }, { key: '经典', value: '《长真真人语录》' }, { key: '圣地', value: '宁海' }], representatives: ['谭处端', '长真子'] },
      { name: '随山派', dynasty: '元代', practice: '清修', description: '随山派是全真道的重要支派，由刘处玄创立，主张"无为而治"。', info: [{ key: '修行方式', value: '无为而治、内丹修炼' }, { key: '理念', value: '随山得道、无为而治' }, { key: '经典', value: '《长生子语录》' }, { key: '圣地', value: '东莱' }], representatives: ['刘处玄', '长生子'] },
      { name: '嵛山派', dynasty: '元代', practice: '清修', description: '嵛山派是全真道的重要支派，由王处一创立，主张"清静无为"。', info: [{ key: '修行方式', value: '清静无为、内丹修炼' }, { key: '理念', value: '嵛山得道、清静无为' }, { key: '经典', value: '《玉阳真人语录》' }, { key: '圣地', value: '宁海' }], representatives: ['王处一', '玉阳子'] },
      { name: '华山派', dynasty: '元代', practice: '清修', description: '华山派是全真道的重要支派，由郝大通创立，主张"清静无为"。', info: [{ key: '修行方式', value: '清静无为、内丹修炼' }, { key: '理念', value: '华山得道、清静无为' }, { key: '经典', value: '《太古真人语录》' }, { key: '圣地', value: '华山' }], representatives: ['郝大通', '太古子'] },
      { name: '清静派', dynasty: '元代', practice: '清修', description: '清静派是全真道的重要支派，由孙不二创立，主张"清静无为"，是唯一的女性创始人。', info: [{ key: '修行方式', value: '清静无为、内丹修炼' }, { key: '理念', value: '清静得道、女性修炼' }, { key: '经典', value: '《孙不二女丹诗》' }, { key: '圣地', value: '宁海' }], representatives: ['孙不二', '清静散人'] },
      { name: '正一道', dynasty: '元代', practice: '符箓', description: '正一道是道教的主要派别之一，由天师道长期演变并与上清、灵宝等派逐渐融合而成。', info: [{ key: '修行方式', value: '符箓法术、斋醮科仪' }, { key: '理念', value: '驱邪避凶、祈福禳灾' }, { key: '经典', value: '《正一经》、《正统道藏》' }, { key: '圣地', value: '龙虎山、茅山、阁皂山' }], representatives: ['张正常', '张宇初', '张继禹'] },
      { name: '三丰派', dynasty: '明代', practice: '内丹', description: '三丰派是道教的重要派别之一，由张三丰创立，融文始、少阳二派，主张性命双修。', info: [{ key: '修行方式', value: '内丹修炼、三教合一' }, { key: '理念', value: '性命双修、得道成仙' }, { key: '经典', value: '《张三丰全集》' }, { key: '圣地', value: '武当山' }], representatives: ['张三丰', '张全一'] },
      { name: '伍柳派', dynasty: '明代', practice: '内丹', description: '伍柳派是道教的重要派别之一，由伍冲虚和柳华阳创立，简化丹道修炼法门。', info: [{ key: '修行方式', value: '内丹修炼、简化法门' }, { key: '理念', value: '内丹简化、得道成仙' }, { key: '经典', value: '《伍柳仙宗》' }, { key: '圣地', value: '南昌' }], representatives: ['伍冲虚', '柳华阳'] },
      { name: '千峰派', dynasty: '清代', practice: '内丹', description: '千峰派是道教的重要派别之一，由赵避尘创立，改丹道单传为普传。', info: [{ key: '修行方式', value: '内丹修炼、丹道普传' }, { key: '理念', value: '丹道普传、得道成仙' }, { key: '经典', value: '《性命法诀明指》' }, { key: '圣地', value: '北京' }], representatives: ['赵避尘', '千峰老人'] },
      { name: '青城派', dynasty: '清代', practice: '内丹', description: '青城派是道教的重要派别之一，以青城山为圣地，注重内丹修炼和武术。', info: [{ key: '修行方式', value: '内丹修炼、武术' }, { key: '理念', value: '青城仙道、内外兼修' }, { key: '经典', value: '《青城秘录》' }, { key: '圣地', value: '青城山' }], representatives: ['杜光庭', '陈清觉', '刘沅'] },
    ];

    for (const sect of sects) {
      try {
        await this.sectModel.create(sect);
      } catch (e) {
        console.error(`创建派系 ${sect.name} 失败:`, e.message);
      }
    }
  }
}