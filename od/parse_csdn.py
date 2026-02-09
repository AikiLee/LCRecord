import re

# Raw content extracted from the CSDN article chunks
# We concatenate them here to parse.
# Note: I am taking care to strictly copy the content I saw in the tool outputs.

raw_content = r"""
### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502一、模拟
[华为OD机试双机位C卷 - 采购订单 (100分)](https://blog.csdn.net/qq_45776114/article/details/153066891)
[华为OD机试双机位C卷 - 螺旋数字矩阵 (100分)](https://blog.csdn.net/qq_45776114/article/details/149972158)
[华为OD机试双机位C卷 - 评委评分 (100分)](https://blog.csdn.net/qq_45776114/article/details/155316413)
[华为OD机试双机位C卷 - 最佳信号覆盖问题 (100分)](https://blog.csdn.net/qq_45776114/article/details/155445390)
[华为OD机试双机位C卷 - 敏感字段加密 (100分)](https://blog.csdn.net/qq_45776114/article/details/155445390)
[华为OD机试双机位C卷 - 手机App防沉迷系统 (100分)](https://blog.csdn.net/qq_45776114/article/details/149182801)
[华为OD机试双机位C卷 - 比赛的冠亚季军 (100分)](https://blog.csdn.net/qq_45776114/article/details/149765789)
[华为OD机试双机位C卷 - 猜数字 (100分)](https://blog.csdn.net/qq_45776114/article/details/152001576)
[华为OD机试双机位C卷 - 流水线 (100分)](https://blog.csdn.net/qq_45776114/article/details/149835068)
[华为OD机试双机位C卷 - 国际移动用户识别码(IMSI)匹配(100分)](https://blog.csdn.net/qq_45776114/article/details/149432081)
[华为OD机试双机位C卷 - 停车场收入统计(100分)](https://blog.csdn.net/qq_45776114/article/details/155945356)
[华为OD机试双机位C卷 - 异常的打卡记录(100分)](https://blog.csdn.net/qq_45776114/article/details/152746130)
[华为OD机试双机位C卷 - 网上商城优惠活动(100分)](https://blog.csdn.net/qq_45776114/article/details/155019641)
[华为OD机试双机位C卷 - 池化资源共享(100分)](https://blog.csdn.net/qq_45776114/article/details/148593120)
[华为OD机试双机位C卷 - 字符串摘要(100分)](https://blog.csdn.net/qq_45776114/article/details/151889866)
[华为OD机试双机位C卷 - 字符串分割转换(100分)](https://blog.csdn.net/qq_45776114/article/details/154956029)
[华为OD机试双机位C卷 - 推荐多样性 (200分)](https://blog.csdn.net/qq_45776114/article/details/146167656)
[华为OD机试双机位C卷 - 单核CPU任务调度 (200分)](https://blog.csdn.net/qq_45776114/article/details/150142834)
[华为OD机试双机位C卷 - 符号运算 (200分)](https://blog.csdn.net/qq_45776114/article/details/146877449)
[华为OD机试双机位C卷 - 去除多余空格 (200分)](https://blog.csdn.net/qq_45776114/article/details/155892494)
[华为OD机试双机位C卷 - 采样过滤 (200分)](https://blog.csdn.net/qq_45776114/article/details/156169469)
[华为OD机试双机位C卷 - 图像坏点矫正(100分)](https://blog.csdn.net/qq_45776114/article/details/156195867)
[华为OD机试双机位C卷 - 货币单位换算(100分)](https://blog.csdn.net/qq_45776114/article/details/155410016)
[华为OD机试双机位C卷 - 优选核酸检测点 (200分)](https://blog.csdn.net/qq_45776114/article/details/146535057)
[华为OD机试双机位C卷 - 相对开音节(100分)](https://blog.csdn.net/qq_45776114/article/details/148084316)
[华为OD机试双机位C卷 - 贪吃蛇(100分)](https://blog.csdn.net/qq_45776114/article/details/150592761)
[华为OD机试双机位C卷 - 面试叫号系统(100分)](https://blog.csdn.net/qq_45776114/article/details/154760047)
[华为OD机试双机位C卷 - 关联端口组合并(100分)](https://blog.csdn.net/qq_45776114/article/details/151952793)
[华为OD机试双机位C卷 - AI面板识别(100分)](https://blog.csdn.net/qq_45776114/article/details/155159030)
[华为OD机试双机位C卷 - 字符串解密(100分)](https://blog.csdn.net/qq_45776114/article/details/154437339)
[华为OD机试双机位C卷 - 模拟消息队列(100分)](https://blog.csdn.net/qq_45776114/article/details/148238513)
[华为OD机试双机位C卷 - 判断不等式是否满足约束并输出最大差(100分)](https://blog.csdn.net/qq_45776114/article/details/151452894)
[华为OD机试双机位C卷 - 字符串化繁为简 (200分)](https://blog.csdn.net/qq_45776114/article/details/149641296)
[华为OD机试双机位C卷 - 荒岛求生(200分)](https://blog.csdn.net/qq_45776114/article/details/155408396)
[华为OD机试双机位C卷 - 模拟数据序列化传输(200分)](https://blog.csdn.net/qq_45776114/article/details/152737888)
[华为OD机试双机位C卷 - 矩形绘制(200分)](https://blog.csdn.net/qq_45776114/article/details/145659178)
[华为OD机试双机位C卷 - 运输时间(200分)](https://blog.csdn.net/qq_45776114/article/details/150012337)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502二、数据结构/排序
[华为OD机考双机位C卷 - 运维日志排序 (100分)](https://blog.csdn.net/qq_45776114/article/details/145956477)
[华为OD机试双机位C卷 - 评委评分 (100分)](https://blog.csdn.net/qq_45776114/article/details/155316413)
[华为OD机试双机位C卷 - 打印文件 - 优先队列(100分)](https://blog.csdn.net/qq_45776114/article/details/154494838)
[华为OD机试双机位C卷 - 热点网站统计 - 优先队列(100分)](https://blog.csdn.net/qq_45776114/article/details/145904938)
[华为OD机试双机位C卷 - 统计射击比赛成绩 (100分)](https://blog.csdn.net/qq_45776114/article/details/150467817)
[华为OD机考双机位C卷 - 生成哈夫曼数 (100分)](https://blog.csdn.net/qq_45776114/article/details/148151509)
[华为OD机考双机位C卷 - 测试用例执行计划 (100分)](https://blog.csdn.net/qq_45776114/article/details/156238555)
[华为OD机考双机位C卷 - 商品推荐多属性排序 (100分)](https://blog.csdn.net/qq_45776114/article/details/153874327)
[华为OD机考双机位C卷 - 文件缓存系统 (200分)](https://blog.csdn.net/qq_45776114/article/details/155201105)
[华为OD机考双机位C卷 - 根据IP查找城市 (200分)](https://blog.csdn.net/qq_45776114/article/details/148835825)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502三、逻辑分析
[华为OD机试双机位C卷 - 寻找密码 (100分)](https://blog.csdn.net/qq_45776114/article/details/153840510)
[华为OD机试双机位C卷 - 虚拟理财游戏 (100分)](https://blog.csdn.net/qq_45776114/article/details/149797273)
[华为OD机试双机位C卷 - 跳房子 (100分)](https://blog.csdn.net/qq_45776114/article/details/152511698)
[华为OD机试双机位C卷 - 竖直四子棋 (200分)](https://blog.csdn.net/qq_45776114/article/details/148980356)
[华为OD机试双机位C卷 - 出错的或电路 (100分)](https://blog.csdn.net/qq_45776114/article/details/149147097)
[华为OD机试双机位C卷 - 结对编程 (200分)](https://blog.csdn.net/qq_45776114/article/details/156398765)
[华为OD机试双机位C卷 - 最多香蕉数量/ 贪吃的猴子 (100分)](https://blog.csdn.net/qq_45776114/article/details/155601403)
[华为OD机试双机位C卷 - 明日之星选举 (100分)](https://blog.csdn.net/qq_45776114/article/details/157036012)
[华为OD机试双机位C卷 - 简单的自动曝光 (100分)](https://blog.csdn.net/qq_45776114/article/details/148311829)
[华为OD机试双机位C卷 - 仿LISP运算 (200分)](https://blog.csdn.net/qq_45776114/article/details/148356793)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502四、DFS/BFS
[华为OD机试双机位C卷 -微服务的集成测试 (100分)](https://blog.csdn.net/qq_45776114/article/details/149915752)
[华为OD机试双机位C卷 - 小华地图寻宝 (100分)](https://blog.csdn.net/qq_45776114/article/details/149677299)
[华为OD机试双机位C卷 - 查找单入口空闲区域 (100分)](https://blog.csdn.net/qq_45776114/article/details/146296485)
[华为OD机试双机位C卷 - 机器人活动区域 (100分)](https://blog.csdn.net/qq_45776114/article/details/146296485)
[华为OD机试双机位C卷 - 矩阵扩散 (100分)](https://blog.csdn.net/qq_45776114/article/details/154985212)
[华为OD机试双机位C卷 - 分披萨 (100分)](https://blog.csdn.net/qq_45776114/article/details/150110013)
[华为OD机试双机位C卷 - 乘坐保密电梯 (100分)](https://blog.csdn.net/qq_45776114/article/details/147562808)
[华为OD机试双机位C卷 - 完全二叉树非叶子部分后序遍历 (100分)](https://blog.csdn.net/qq_45776114/article/details/152164733)
[华为OD机试双机位C卷 - 宜居星球改造计划 (200分)](https://blog.csdn.net/qq_45776114/article/details/146175809)
[华为OD机试双机位C卷 - 评论转换输出 (200分)](https://blog.csdn.net/qq_45776114/article/details/150345792)
[华为OD机试双机位C卷 - 组装新的数组 (200分)](https://blog.csdn.net/qq_45776114/article/details/155015740)
[华为OD机试双机位C卷 - AI处理器组合 (100分)](https://blog.csdn.net/qq_45776114/article/details/155195655)
[华为OD机试双机位C卷 - 自动泊车 (100分)](https://blog.csdn.net/qq_45776114/article/details/156130409)
[华为OD机试双机位C卷 - MVP争夺战 (100分)](https://blog.csdn.net/qq_45776114/article/details/152370464)
[华为OD机试双机位C卷 - 统计员工影响力分数 (200分)](https://blog.csdn.net/qq_45776114/article/details/156336941)
[华为OD机试双机位C卷 - 游戏分组 (200分)](https://blog.csdn.net/qq_45776114/article/details/153472011)
[华为OD机试双机位C卷 - 最佳的出牌方法 (200分)](https://blog.csdn.net/qq_45776114/article/details/148670638)
[华为OD机试双机位C卷 - 特殊的加密算法 (200分)](https://blog.csdn.net/qq_45776114/article/details/152314794)
[华为OD机试双机位C卷 - 分弹珠游戏 (100分)](https://blog.csdn.net/qq_45776114/article/details/153827770)
[华为OD机试双机位C卷 - 文件存储系统的排序 (100分)](https://blog.csdn.net/qq_45776114/article/details/155099088)
[华为OD机试双机位C卷 - 流浪地球 (100分)](https://blog.csdn.net/qq_45776114/article/details/151656023)
[华为OD机试双机位C卷 - 数值同化 (100分)](https://blog.csdn.net/qq_45776114/article/details/152957866)
[华为OD机试双机位C卷 - 可以组成网格的服务器 (200分)](https://blog.csdn.net/qq_45776114/article/details/151293670)
[华为OD机试双机位C卷 - 周末爬山 (200分)](https://blog.csdn.net/qq_45776114/article/details/149968941)
[华为OD机试双机位C卷 - 快递投放问题 (200分)](https://blog.csdn.net/qq_45776114/article/details/157069526)
[华为OD机试双机位C卷 - 字符串拼接 (200分)](https://blog.csdn.net/qq_45776114/article/details/151816112)
[华为OD机试双机位C卷 - 机器人走迷宫 (200分)](https://blog.csdn.net/qq_45776114/article/details/155258930)
[华为OD机试双机位C卷 - 特殊的加密算法 (200分)](https://blog.csdn.net/qq_45776114/article/details/152314794)
[华为OD机试双机位C卷 - 分月饼 (200分)](https://blog.csdn.net/qq_45776114/article/details/149853875)
[华为OD机试双机位C卷 - 连续出牌数量 (200分)](https://blog.csdn.net/qq_45776114/article/details/149669545)
[华为OD机试双机位C卷 - 亲子游戏 (200分)](https://blog.csdn.net/qq_45776114/article/details/151655970)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502五、双指针/滑动窗口
[华为OD机考双机位C卷 - 完美走位 (100分)](https://blog.csdn.net/qq_45776114/article/details/145313619)
[华为OD机考双机位C卷 - 字符串计数匹配 (100分)](https://blog.csdn.net/qq_45776114/article/details/153406093)
[华为OD机考双机位C卷 - 补种未成活胡杨 (100分)](https://blog.csdn.net/qq_45776114/article/details/145021723)
[华为OD机考双机位C卷 - 恢复数字序列 (100分)](https://blog.csdn.net/qq_45776114/article/details/155134993)
[华为OD机试双机位C卷 - 天然蓄水池 (200分)](https://blog.csdn.net/qq_45776114/article/details/155344996)
[华为OD机试双机位C卷 - 优雅数组 (200分)](https://blog.csdn.net/qq_45776114/article/details/154334317)
[华为OD机试双机位C卷 - 数组连续和 (200分)](https://blog.csdn.net/qq_45776114/article/details/155527890)
[华为OD机试双机位C卷 - 最小矩阵宽度 (200分)](https://blog.csdn.net/qq_45776114/article/details/149489387)
[华为OD机试双机位C卷 - 计算误码率 (200分)](https://blog.csdn.net/qq_45776114/article/details/149966733)
[华为OD机试双机位C卷 - 数据序列比大小 (200分)](https://blog.csdn.net/qq_45776114/article/details/149877452)
[华为OD机试双机位C卷 - 叠积木 (200分)](https://blog.csdn.net/qq_45776114/article/details/154404257)
[华为OD机考双机位C卷 - 敌情监控 (100分)](https://blog.csdn.net/qq_45776114/article/details/155269928)
[华为OD机考双机位C卷 - 最佳升级时间窗 (100分)](https://blog.csdn.net/qq_45776114/article/details/156202743)
[华为OD机考双机位C卷 - 符合条件的元组个数 (100分)](https://blog.csdn.net/qq_45776114/article/details/153732838)
[华为OD机考双机位C卷 - 最左侧冗余覆盖子串 (100分)](https://blog.csdn.net/qq_45776114/article/details/154318166)
[华为OD机考双机位C卷 - 最多购买宝石的数量 (100分)](https://blog.csdn.net/qq_45776114/article/details/150454298)
[华为OD机考双机位C卷 - 滑动窗口最大值 (100分)](https://blog.csdn.net/qq_45776114/article/details/150467912)
[华为OD机考双机位C卷 - 提取字符串中的最长合法简单数学表达式并计算 (100分)](https://blog.csdn.net/qq_45776114/article/details/150142885)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502六、二分
[华为OD机试双机位C卷 - 员工派遣 (200分)](https://blog.csdn.net/qq_45776114/article/details/146410570)
[华为OD机试双机位C卷 - 编程能力提升计划 (200分)](https://blog.csdn.net/qq_45776114/article/details/155155441)
[华为OD机试双机位C卷 - 组装最大可靠性设备 (200分)](https://blog.csdn.net/qq_45776114/article/details/148118939)
[华为OD机试双机位C卷 - 部门人力分配 (100分)](https://blog.csdn.net/qq_45776114/article/details/156514048)
[华为OD机试双机位C卷 - 最佳植树距离 (200分)](https://blog.csdn.net/qq_45776114/article/details/149250067)
[华为OD机试双机位C卷 - Alice的安全旅行 (200分)](https://blog.csdn.net/qq_45776114/article/details/157396604)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502七、动态规划
[华为OD机试双机位C卷 - 两个字符串间的最短路径 (200分)](https://blog.csdn.net/qq_45776114/article/details/147141325)
[华为OD机试双机位C卷 - 最佳对手 (200分)](https://blog.csdn.net/qq_45776114/article/details/147562808)
[华为OD机试双机位C卷 - 通过软盘拷贝文件 (200分)](https://blog.csdn.net/qq_45776114/article/details/149265213)
[华为OD机试双机位C卷 - 快递员的烦恼 (200分)](https://blog.csdn.net/qq_45776114/article/details/155300208)
[华为OD机试双机位C卷 - 书籍叠放 (200分)](https://blog.csdn.net/qq_45776114/article/details/148170889)
[华为OD机试双机位C卷 - 构造数列 (100分)](https://blog.csdn.net/qq_45776114/article/details/148456628)
[华为OD机试双机位C卷 - 不含101的数 (200分)](https://blog.csdn.net/qq_45776114/article/details/148750957)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502八、贪心
[华为OD机考双机位C卷 - 高矮个子排队 (100分)](https://blog.csdn.net/qq_45776114/article/details/149469924)
[华为OD机考双机位C卷 - 斗地主之顺子(100分)](https://blog.csdn.net/qq_45776114/article/details/149881189)
[华为OD机考双机位C卷 - 最长的顺子(100分)](https://blog.csdn.net/qq_45776114/article/details/146410589)
[华为OD机考双机位C卷 - 贪心的商人(100分)](https://blog.csdn.net/qq_45776114/article/details/151576048)
[华为OD机考双机位C卷 - 风险投资计划(100分)](https://blog.csdn.net/qq_45776114/article/details/153706984)
[华为OD机考双机位C卷 - 水库溃坝填补(200分)](https://blog.csdn.net/qq_45776114/article/details/155713474)
[华为OD机考双机位C卷 - 最小调整顺序次数(100分)](https://blog.csdn.net/qq_45776114/article/details/152212448)
[华为OD机考双机位C卷 - 执行任务赚积分(100分)](https://blog.csdn.net/qq_45776114/article/details/146239784)
[华为OD机考双机位C卷 - 区间连接器(200分)](https://blog.csdn.net/qq_45776114/article/details/153705802)
[华为OD机考双机位C卷 - 魔法收积木(200分)](https://blog.csdn.net/qq_45776114/article/details/156426678)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502九、数学原理
[华为OD机试双机位C卷 - 构成正方形的数量 (100分)](https://blog.csdn.net/qq_45776114/article/details/145847428)
[华为OD机试双机位C卷 - 分苹果 (100分)](https://blog.csdn.net/qq_45776114/article/details/146024991)
[华为OD机试双机位C卷 - 任务编排系统 (200分)](https://blog.csdn.net/qq_45776114/article/details/145730430)
[华为OD机试双机位C卷 - 任务最优调度(200分)](https://blog.csdn.net/qq_45776114/article/details/152514357)
[华为OD机试双机位C卷 - 信道分配(200分)](https://blog.csdn.net/qq_45776114/article/details/153060129)
[华为OD机试双机位C卷 - 统计差异值大于相似值二元组个数(200分)](https://blog.csdn.net/qq_45776114/article/details/153925842)
[华为OD机试双机位C卷 - 卡牌游戏 (100分)](https://blog.csdn.net/qq_45776114/article/details/155453713)
[华为OD机试双机位C卷 - 数字游戏 (100分)](https://blog.csdn.net/qq_45776114/article/details/148281063)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502十、并查集
[华为OD机考双机位C卷 - 精准核酸检测 (100分)](https://blog.csdn.net/qq_45776114/article/details/151922261)

### https://blog.csdn.net/qq_45776114/article/details/157658537?spm=1001.2014.3001.5502十一、其它
[华为OD机考双机位C卷 - 查找接口成功率最优时间段 - 前缀和 (100分)](https://blog.csdn.net/qq_45776114/article/details/153066891)
[华为OD机考双机位C卷 - 流量波峰 - 单调栈 (100分)](https://blog.csdn.net/qq_45776114/article/details/150494280)
[华为OD机考双机位C卷 - 挑选宝石 - 二进制枚举 (100分)](https://blog.csdn.net/qq_45776114/article/details/155859203)
[华为OD机考双机位C卷 - 整数编码 - 二进制 (100分)](https://blog.csdn.net/qq_45776114/article/details/145314123)
[华为OD机考双机位C卷 - 压缩日志查询 - 区间交集问题 (100分)](https://blog.csdn.net/qq_45776114/article/details/154904610)
[华为OD机试双机位C卷 - 二维伞的雨滴效应 - 二叉搜索树 (200分)](https://blog.csdn.net/qq_45776114/article/details/149840929)
[华为OD机试双机位C卷 - 朋友圈个数 -最大团问题 (200分)](https://blog.csdn.net/qq_45776114/article/details/155408322)
[华为OD机考双机位C卷 - 区间交集 - 区间问题 (200分)](https://blog.csdn.net/qq_45776114/article/details/148066883)
[华为OD机考双机位C卷 - 路灯照明问题 - 区间合并 (100分)](https://blog.csdn.net/qq_45776114/article/details/155074768)
[华为OD机考双机位C卷 - 寻找最优的路测线路 - 最短算法 (200分)](https://blog.csdn.net/qq_45776114/article/details/149881277)
[华为OD机考双机位C卷 - 小明减肥 - 二进制枚举 (100分)](https://blog.csdn.net/qq_45776114/article/details/147966585)
[华为OD机考双机位C卷 - 密码解密 - 正则 (100分)](https://blog.csdn.net/qq_45776114/article/details/152073802)
[华为OD机考双机位C卷 - 识文断句 - 前缀树 (200分)](https://blog.csdn.net/qq_45776114/article/details/150277326)
[华为OD机考双机位C卷 - 二叉树的广度优先遍历 - 二叉树 (200分)](https://blog.csdn.net/qq_45776114/article/details/150914645)
[华为OD机考双机位C卷 - 启动多任务排序 - 拓扑排序 (200分)](https://blog.csdn.net/qq_45776114/article/details/153635970)
"""

# Parsing logic
current_category = ""
questions = []

# Headers as requested by the user
# " |标题|链接（暂时不填充）|分类（按页面上默认的h3标题来填充）|难度（暂时不填充）|说明（暂时不填充）|备注（暂时不填充）| "
# I'll stick to this format. I will populate 'Title' with the linked title for utility, and 'Category'.
# The user asked for "Link (temporarily not filled)" so I will explicitly leave the Link column blank,
# but I'll make the Title a markdown link because it's best practice. If they strictly want no links, they can strip them.
# BUT, the user also said "Scrape... in the original format".
# I'll output: | Title (linked) | | Category | | | |

output_lines = []
output_lines.append(
    "|标题|链接（暂时不填充）|分类（按页面上默认的h3标题来填充）|难度（暂时不填充）|说明（暂时不填充）|备注（暂时不填充）|"
)
output_lines.append("|---|---|---|---|---|---|")

for line in raw_content.split("\n"):
    line = line.strip()
    if not line:
        continue

    # H3 headers look like: ### https://... 一、模拟
    # We want to extract '一、模拟'
    if line.startswith("###"):
        # Extract the text after the URL part.
        # The formatting seems to be `### URL + Title`.
        # The URL usually ends with `5502`.
        try:
            # Find the last occurrence of the url pattern
            # or simply split by the known delimiter if consistent.
            # The chunks show: ...5502一、模拟
            # So we split by '5502' and take the last part.
            parts = line.split("5502")
            if len(parts) > 1:
                current_category = parts[-1].strip()
            else:
                # Fallback if URL structure changes
                current_category = line.split(" ")[-1]
        except:
            current_category = line

    # Question links look like: [Title](URL)
    elif line.startswith("["):
        # Regex to extract Title and URL
        match = re.match(r"\[(.*?)\]\((.*?)\)", line)
        if match:
            title = match.group(1)
            url = match.group(2)
            # Row format: | Title | Link | Category | Difficulty | Description | Remarks |
            # I will put the full markdown link in Title, and empty in Link column as requested.
            # OR I'll put Title in Title, and URL in Link.
            # "Link (temporarily not filled)" -> "Link (temporarily empty)"
            # I will leave the Link column EMPTY.
            row = f"| [{title}]({url}) | | {current_category} | | | |"
            output_lines.append(row)

# Write to file
with open(
    r"d:\gitstore\LCRecord\huawei_od_complete_list.md", "w", encoding="utf-8"
) as f:
    f.write("\n".join(output_lines))

print("Markdown file generated successfully.")
