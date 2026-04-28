import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Figure, FigureDocument } from './figure.schema';

@Injectable()
export class FigureSeed implements OnModuleInit {
  constructor(@InjectModel(Figure.name) private figureModel: Model<FigureDocument>) {}

  async onModuleInit() {
    const count = await this.figureModel.countDocuments();
    if (count === 0) {
      console.log('开始初始化人物数据...');
      await this.seedFigures();
      console.log('人物数据初始化完成');
    }
  }

  private async seedFigures() {
    const figures = [
      { name: '老子', era: '春秋', eraOrder: 1, description: '道家学派创始人，著有《道德经》', bio: '老子，姓李名耳，字聃，春秋末期人。他是道家学派的创始人，被尊为道教始祖。老子主张无为而治，强调顺应自然，其思想对中国哲学产生了深远影响。', coreThoughts: ['无为', '道法自然', '小国寡民', '柔弱胜刚强', '玄之又玄'], works: ['道德经'] },
      { name: '文子', era: '春秋', eraOrder: 1, description: '道家思想家，老子弟子', bio: '文子，姓辛名钘，字文子，春秋时期宋国人，老子的弟子。著有《文子》，以"道生法"为核心，将《道德经》的"无为"转化为治国方略。', coreThoughts: ['道生法', '循道而治', '以德辅法'], works: ['文子'] },
      { name: '关尹子', era: '春秋', eraOrder: 1, description: '道家思想家，文始派创始人', bio: '关尹子，名喜，字公度，春秋时期函谷关令。他是老子的弟子，著有《关尹子》，主张"贵清""贵虚"，强调精神的自由和超越。', coreThoughts: ['贵清', '贵虚', '精神自由'], works: ['关尹子'] },
      { name: '庄子', era: '战国', eraOrder: 2, description: '道家代表人物，著有《庄子》', bio: '庄子，名周，战国时期宋国人。他是道家学派的重要代表人物，继承和发展了老子的思想。庄子主张逍遥游，追求精神自由。', coreThoughts: ['逍遥游', '齐物论', '相对主义', '坐忘'], works: ['庄子'] },
      { name: '列子', era: '战国', eraOrder: 2, description: '道家思想家，著有《列子》', bio: '列子，名御寇，战国时期郑国人。他是道家学派的重要代表人物，其思想强调虚静无为，顺应自然。', coreThoughts: ['虚静', '无为', '自然'], works: ['列子'] },
      { name: '杨朱', era: '战国', eraOrder: 2, description: '道家思想家，主张贵己', bio: '杨朱，战国时期魏国人。他是道家学派的重要代表人物，主张"贵己""重生"，强调个人的生命价值和自由。', coreThoughts: ['贵己', '重生', '为我'], works: ['杨朱篇'] },
      { name: '张道陵', era: '东汉', eraOrder: 3, description: '道教创始人，五斗米道祖师', bio: '张道陵，字辅汉，东汉时期沛国人。他在四川鹤鸣山创立五斗米道，被尊为"张天师"，是道教的创始人。', coreThoughts: ['守戒积善', '符箓治病', '道即太上老君'], works: ['老子想尔注'] },
      { name: '张衡', era: '东汉', eraOrder: 3, description: '五斗米道第二代天师', bio: '张衡，字灵真，张道陵之子。他继承父业，继续传播五斗米道，是五斗米道的第二代天师。', coreThoughts: ['符箓治病'], works: [] },
      { name: '张鲁', era: '东汉', eraOrder: 3, description: '五斗米道第三代天师', bio: '张鲁，字公祺，张衡之子。他在汉中建立政教合一政权，推行"宽刑、义舍、禁酒"政策，使汉中成为乱世中的稳定区域。', coreThoughts: ['宽刑', '义舍', '禁酒'], works: [] },
      { name: '张角', era: '东汉', eraOrder: 3, description: '太平道创始人', bio: '张角，东汉末年钜鹿人。他以《太平经》为理论基础，创立太平道，提出"苍天已死，黄天当立"口号，组织黄巾起义。', coreThoughts: ['太平世', '积善成仙', '财物共养'], works: ['太平经'] },
      { name: '于吉', era: '东汉', eraOrder: 3, description: '太平道思想传播者', bio: '于吉，东汉末年琅琊人。他整理编纂《太平经》，融合道家无为、儒家伦理与民间信仰。', coreThoughts: ['积善成仙', '财物共养'], works: ['太平经'] },
      { name: '魏伯阳', era: '东汉', eraOrder: 3, description: '丹道理论奠基人', bio: '魏伯阳，东汉末年会稽上虞人。他著有《周易参同契》，融合《周易》阴阳学说、黄老思想与炼丹术，首次系统阐述"内丹"与"外丹"理论。', coreThoughts: ['内丹', '外丹', '周易参同'], works: ['周易参同契'] },
      { name: '葛玄', era: '三国', eraOrder: 4, description: '灵宝派祖师', bio: '葛玄，字孝先，三国时期吴国人。他传习"灵宝经法"，擅长符箓驱邪、炼丹养生，是灵宝派的祖师。', coreThoughts: ['灵宝经法', '符箓驱邪', '炼丹养生'], works: [] },
      { name: '葛洪', era: '东晋', eraOrder: 4, description: '道教理论家、炼丹家', bio: '葛洪，字稚川，东晋时期丹阳句容人。他著有《抱朴子》，系统阐述金丹修炼理论，为丹道奠定基础。', coreThoughts: ['金丹修炼', '神仙方术', '医药养生'], works: ['抱朴子', '肘后备急方'] },
      { name: '魏华存', era: '东晋', eraOrder: 4, description: '上清派祖师', bio: '魏华存，字贤安，东晋时期任城人。她是上清派的创始人，传《上清经》，主张存思守一的修炼方法。', coreThoughts: ['存思守一', '上清经法'], works: ['黄庭经'] },
      { name: '杨羲', era: '东晋', eraOrder: 4, description: '上清派重要传人', bio: '杨羲，东晋时期吴国人。他是上清派的重要传人，传习《上清经》，整理上清派经典。', coreThoughts: ['存思守一', '上清经法'], works: [] },
      { name: '许谧', era: '东晋', eraOrder: 4, description: '上清派重要传人', bio: '许谧，东晋时期丹阳句容人。他是上清派的重要传人，与杨羲一起整理上清派经典。', coreThoughts: ['存思守一', '上清经法'], works: [] },
      { name: '陶弘景', era: '南朝', eraOrder: 4, description: '茅山宗创始人', bio: '陶弘景，字通明，南朝时期丹阳秣陵人。他整理上清派典籍，构建道教神仙体系，撰写《真灵位业图》，被尊为"华阳真人"。', coreThoughts: ['神仙体系', '三教合一', '内丹修炼'], works: ['真诰', '登真隐诀', '真灵位业图'] },
      { name: '寇谦之', era: '北魏', eraOrder: 4, description: '新天师道创始人', bio: '寇谦之，字辅真，北魏时期冯翊万年人。他改革天师道，清整戒律，创立新天师道，获得北魏统治者的正式承认。', coreThoughts: ['清整戒律', '新天师道'], works: [] },
      { name: '陆修静', era: '南朝', eraOrder: 4, description: '道教经典整理者', bio: '陆修静，字元德，南朝时期吴兴东迁人。他整理道教经典，总括三洞，撰写《三洞经书目录》，建立了完善的经典教义与科戒仪式。', coreThoughts: ['三洞经书', '科戒仪式'], works: ['三洞经书目录'] },
      { name: '孙思邈', era: '唐代', eraOrder: 5, description: '道医、丹道大师', bio: '孙思邈，唐代京兆华原人。他融道医与丹道，著《千金方》，被誉为"药王"。', coreThoughts: ['道医结合', '养生保健'], works: ['千金方', '千金翼方'] },
      { name: '司马承祯', era: '唐代', eraOrder: 5, description: '上清派传人', bio: '司马承祯，字子微，唐代河内温人。他弘扬上清派修炼法门，著《坐忘论》，主张"坐忘""主静"的修炼方法。', coreThoughts: ['坐忘', '主静'], works: ['坐忘论'] },
      { name: '吴筠', era: '唐代', eraOrder: 5, description: '上清派传人', bio: '吴筠，字贞节，唐代华州华阴人。他弘扬上清派修炼法门，著《玄纲论》。', coreThoughts: ['守静', '坐忘'], works: ['玄纲论'] },
      { name: '王玄甫', era: '唐代', eraOrder: 5, description: '少阳派始祖', bio: '王玄甫，唐代人，号东华帝君。他传承金丹道脉，为少阳派始祖，开启钟吕金丹道传承。', coreThoughts: ['金丹道', '内丹修炼'], works: [] },
      { name: '钟离权', era: '唐代', eraOrder: 5, description: '少阳派传人', bio: '钟离权，唐代咸阳人，号正阳子。他传承金丹道脉，与吕洞宾一起创立钟吕金丹道。', coreThoughts: ['金丹道', '性命双修'], works: [] },
      { name: '吕洞宾', era: '唐代', eraOrder: 5, description: '纯阳派创始人', bio: '吕洞宾，唐代河中府永乐县人，号纯阳子。他传承金丹道脉，创立纯阳派，主张性命双修。', coreThoughts: ['纯阳道', '性命双修'], works: [] },
      { name: '陈抟', era: '北宋', eraOrder: 6, description: '文始派传人', bio: '陈抟，字图南，北宋时期亳州真源人。他传承文始派脉，融文始、少阳二派精髓，著《指玄篇》。', coreThoughts: ['指玄', '内丹修炼'], works: ['指玄篇', '无极图'] },
      { name: '张伯端', era: '北宋', eraOrder: 6, description: '南宗创始人', bio: '张伯端，字平叔，北宋时期天台人。他创立金丹派南宗，主先命后性，著《悟真篇》。', coreThoughts: ['先命后性', '内丹修炼'], works: ['悟真篇'] },
      { name: '王重阳', era: '金代', eraOrder: 6, description: '全真道创始人', bio: '王重阳，字知明，金代咸阳人。他创立全真道，主张三教合一、先性后命，传北七真。', coreThoughts: ['三教合一', '先性后命', '出家清修'], works: ['重阳立教十五论'] },
      { name: '丘处机', era: '金代', eraOrder: 6, description: '龙门派创始人', bio: '丘处机，字通密，金代登州栖霞人。他是全真七子之一，创立龙门派，主张"功行双全"。', coreThoughts: ['功行双全', '龙门心法'], works: ['大丹直指'] },
      { name: '马钰', era: '金代', eraOrder: 6, description: '遇仙派创始人', bio: '马钰，字玄宝，金代宁海人。他是全真七子之一，创立遇仙派，主张"清净无为"。', coreThoughts: ['清净无为'], works: [] },
      { name: '谭处端', era: '金代', eraOrder: 6, description: '南无派创始人', bio: '谭处端，字通正，金代宁海人。他是全真七子之一，创立南无派，主张"清静无为"。', coreThoughts: ['清静无为'], works: [] },
      { name: '刘处玄', era: '金代', eraOrder: 6, description: '随山派创始人', bio: '刘处玄，字通妙，金代东莱人。他是全真七子之一，创立随山派，主张"无为而治"。', coreThoughts: ['无为而治'], works: [] },
      { name: '王处一', era: '金代', eraOrder: 6, description: '嵛山派创始人', bio: '王处一，字通叟，金代宁海人。他是全真七子之一，创立嵛山派，主张"清静无为"。', coreThoughts: ['清静无为'], works: [] },
      { name: '郝大通', era: '金代', eraOrder: 6, description: '华山派创始人', bio: '郝大通，字太古，金代宁海人。他是全真七子之一，创立华山派，主张"清静无为"。', coreThoughts: ['清静无为'], works: [] },
      { name: '孙不二', era: '金代', eraOrder: 6, description: '清静派创始人', bio: '孙不二，号清静散人，金代宁海人。她是全真七子之一，创立清静派，主张"清静无为"，是唯一的女性创始人。', coreThoughts: ['清静无为'], works: ['孙不二女丹诗'] },
      { name: '白玉蟾', era: '南宋', eraOrder: 6, description: '南宗重要传人', bio: '白玉蟾，字如晦，南宋时期琼州人。他是金丹派南宗的重要传人，主张性命双修。', coreThoughts: ['性命双修', '内丹修炼'], works: ['海琼玉蟾先生文集'] },
      { name: '萧抱珍', era: '金代', eraOrder: 6, description: '太一道创始人', bio: '萧抱珍，金代卫州人。他创立太一道，重符箓斋醮，规定道士必须出家。', coreThoughts: ['太一三元法箓', '符箓斋醮'], works: [] },
      { name: '刘德仁', era: '金代', eraOrder: 6, description: '真大道创始人', bio: '刘德仁，金代沧州乐陵人。他创立真大道，以清心寡欲、谦卑自守、力作而食为教旨。', coreThoughts: ['清心寡欲', '谦卑自守', '力作而食'], works: [] },
      { name: '张三丰', era: '明代', eraOrder: 7, description: '三丰派创始人', bio: '张三丰，明代辽东懿州人。他创立三丰派，融文始、少阳二派，主张性命双修。', coreThoughts: ['性命双修', '三教合一', '内丹修炼'], works: ['张三丰全集'] },
      { name: '张正常', era: '明代', eraOrder: 7, description: '正一道天师', bio: '张正常，明代龙虎山道士。他是正一道的天师，受朝廷认可，延续天师道的传承。', coreThoughts: ['符箓斋醮'], works: [] },
      { name: '张宇初', era: '明代', eraOrder: 7, description: '正一道天师', bio: '张宇初，明代龙虎山道士。他是正一道的天师，著《道门十规》，对正一道的发展做出了重要贡献。', coreThoughts: ['道门十规', '正一道规'], works: ['道门十规'] },
      { name: '伍冲虚', era: '明代', eraOrder: 7, description: '伍柳派创始人', bio: '伍冲虚，明代江西南昌人。他创立伍柳派，简化丹道修炼法门。', coreThoughts: ['内丹简化'], works: ['伍柳仙宗'] },
      { name: '柳华阳', era: '清代', eraOrder: 8, description: '伍柳派创始人', bio: '柳华阳，清代江西南昌人。他与伍冲虚一起创立伍柳派，简化丹道修炼法门。', coreThoughts: ['内丹简化'], works: ['伍柳仙宗'] },
      { name: '赵避尘', era: '清代', eraOrder: 8, description: '千峰派创始人', bio: '赵避尘，清代北京人。他创立千峰派，改丹道单传为普传。', coreThoughts: ['丹道普传', '内丹修炼'], works: ['性命法诀明指'] },
      { name: '张恩溥', era: '清代', eraOrder: 8, description: '正一道天师', bio: '张恩溥，清代龙虎山道士。他是正一道的天师，第六十三代天师，赴台延续道统。', coreThoughts: ['符箓斋醮'], works: [] },
    ];

    for (const figure of figures) {
      try {
        await this.figureModel.create(figure);
      } catch (e) {
        console.error(`创建人物 ${figure.name} 失败:`, e.message);
      }
    }
  }
}