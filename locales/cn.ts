const translations = {
  header: {
    title: "空气质量与紫外线监测",
    subtitle: "实时环境数据，尽在掌握。",
  },
  citySelector: {
    label: "选择城市",
    searchPlaceholder: "搜索城市...",
    notFound: "未找到城市。",
  },
  app: {
    showingDataFor: "正在显示",
    lastUpdated: "最后更新于",
    poweredBy: "由 Open-Meteo 和 Current UV Index API 提供支持",
    healthImpact: "对健康的影响",
    recommendations: "建议",
  },
  levels: {
    uv: {
      low: "低",
      moderate: "中等",
      high: "高",
      veryHigh: "很高",
      extreme: "极高",
    },
    aqi: {
      good: "优",
      moderate: "中等",
      unhealthySensitive: "对敏感人群不健康",
      unhealthy: "不健康",
      veryUnhealthy: "非常不健康",
    },
  },
  metrics: {
    uv: {
      title: "紫外线指数",
      description: "衡量导致晒伤的紫外线辐射强度。",
      details: {
        description: "紫外线指数是衡量太阳紫外线辐射水平的国际标准。该指数旨在帮助人们保护自己免受过度的紫外线照射。",
        healthImpact: "过度暴露于紫外线下会导致晒伤、皮肤过早老化、眼睛损伤（如白内障），并增加患皮肤癌的风险。即使在多云天气，高紫外线水平也是危险的。",
        recommendations: [
          "使用SPF 30+的防晒霜。",
          "穿戴防护服、宽边帽和太阳镜。",
          "寻找阴凉处，尤其是在上午10点至下午4点之间。",
          "避免长时间直接暴露在阳光下。"
        ]
      }
    },
    pm2_5: {
      title: "PM2.5",
      description: "可吸入细颗粒物，直径<2.5微米。",
      details: {
        description: "PM2.5是直径为2.5微米或更小的微小空气污染颗粒。其微小的尺寸使其能够深入呼吸道，甚至进入血液。",
        healthImpact: "短期接触可引起眼睛、鼻子、喉咙和肺部刺激。长期接触与心脏病、中风、慢性肺病和肺癌等严重健康问题有关。",
        recommendations: [
          "当PM2.5水平高时，限制户外活动。",
          "在室内使用空气净化器。",
          "如果必须外出，请佩戴N95口罩。",
          "关闭门窗以减少室内污染。"
        ]
      }
    },
    pm10: {
      title: "PM10",
      description: "可吸入粗颗粒物，直径<10微米。",
      details: {
        description: "PM10是空气中直径为10微米或更小的颗粒。这些颗粒比PM2.5大，通常包括灰尘、花粉和霉菌孢子。",
        healthImpact: "PM10会刺激眼睛、鼻子和喉咙。对于患有哮喘等呼吸系统疾病的人来说，接触PM10会引发疾病发作并加重症状。",
        recommendations: [
          "避免进入建筑工地或未铺砌道路等灰尘浓度高的区域。",
          "保持房屋清洁以减少灰尘。",
          "空气质量差时，限制剧烈的户外活动。"
        ]
      }
    },
    ozone: {
      title: "臭氧 (O₃)",
      description: "烟雾的主要成分，在地面水平有害。",
      details: {
        description: "地面臭氧是当其他污染物（如氮氧化物和挥发性有机化合物）在阳光下发生反应时形成的二次污染物。它是烟雾的主要成分。",
        healthImpact: "吸入臭氧会导致胸痛、咳嗽、喉咙刺激和呼吸急促。它会加重支气管炎、肺气肿和哮喘等疾病，并损害肺组织。",
        recommendations: [
          "在炎热、阳光明媚的下午，当臭氧水平通常最高时，减少剧烈的户外活动。",
          "注意地方当局发布的空气质量警报。",
          "支持使用清洁能源以减少臭氧前体物的排放。"
        ]
      }
    },
    carbon_monoxide: {
      title: "一氧化碳 (CO)",
      description: "来自不完全燃烧的有毒气体。",
      details: {
        description: "一氧化碳是一种无色无味的气体，由燃料不完全燃烧产生，例如在机动车、加热器和工业过程中。",
        healthImpact: "一氧化碳会减少血液中输送到心脏和大脑等关键器官的氧气量。高浓度接触可能致命，而低浓度接触会导致胸痛、意识模糊和类似流感的症状。",
        recommendations: [
          "使用燃烧设备时确保通风良好。",
          "切勿在封闭的车库内发动汽车。",
          "如果使用燃料燃烧设备，请在家中安装一氧化碳探测器。"
        ]
      }
    },
    nitrogen_dioxide: {
      title: "二氧化氮 (NO₂)",
      description: "来自车辆和工业排放的活性气体。",
      details: {
        description: "二氧化氮是一种红棕色的活性气体，主要来自车辆排放、发电厂和工业。它有助于形成地面臭氧和酸雨。",
        healthImpact: "吸入二氧化氮会刺激呼吸道，加重哮喘等呼吸系统疾病，并可能导致儿童患上哮喘。长期接触会降低肺功能。",
        recommendations: [
          "支持减少车辆排放的交通政策。",
          "避免在繁忙的道路附近锻炼。",
          "尽可能使用公共交通、骑自行车或步行。"
        ]
      }
    },
    sulphur_dioxide: {
      title: "二氧化硫 (SO₂)",
      description: "来自化石燃料燃烧的气体，导致酸雨。",
      details: {
        description: "二氧化硫是一种无色、有刺激性气味的气体，由发电厂和工业燃烧化石燃料（主要是煤和石油）产生。它是酸雨的主要原因。",
        healthImpact: "接触二氧化硫会刺激呼吸系统并加重哮喘。哮喘患者对二氧化硫特别敏感，即使短暂接触也可能出现呼吸急促。",
        recommendations: [
          "支持向更清洁的能源过渡。",
          "工业当局应使用排放控制技术来减少二氧化硫的释放。",
          "哮喘患者在进行户外活动前应检查空气质量数据。"
        ]
      }
    }
  }
};

export default translations;
