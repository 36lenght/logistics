<template>
  <div>
    <div id="map" class="map"></div>
  </div>
</template>
<script>
export default {
  name: "Openlayers4",
  data() {
    return {
      map: null,
      view: null,
      addVectorLabel: null,
    };
  },
  methods: {},
  mounted() {
    // ol.View对象，表示地图的视图
    this.view = new this.ol.View({
      // 设置地图的初始中心
      center: [116.28, 39.54],
      // 设置缩放级别
      zoom: 7,
      // 设置坐标系
      projection: "EPSG:4326",
    });
    // 实例化Map对象加载地图
    this.map = new this.ol.Map({
      view: this.view,
      layers: [
        // 使用ol.layer.Tile创建地图
        new this.ol.layer.Tile({
          source: new this.ol.source.OSM(),
        }),
      ],
      target: "map",
    });
    // 创建矢量标注样式函数，设置 image 为图标 ol.style.Icon
    var createLabelStyle = (feature) =>
      new this.ol.style.Style({
        image: new this.ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorOrigin: "top-right",
          // offset:[0,10],
          //图标缩放比例
          // scale:0.5,
          //透明度
          opacity: 1,
          src: "https://www.easyicon.net/api/resizeApi.php?id=1192128&size=16",
        }),
      });
    // 实例化 vector 要素，通过矢量图层添加到地图容器
    var iconFeature = new this.ol.Feature({
      geometry: new this.ol.geom.Point([116.3915, 39.907]),
    });
    // 矢量标注的数据源
    var vectorSource = new this.ol.source.Vector({
      features: [iconFeature],
    });
    // 矢量标注图层
    var vectorLayer = new this.ol.layer.Vector({
      source: vectorSource,
    });
    iconFeature.setStyle(createLabelStyle(iconFeature));
    //  添加到map层
    this.map.addLayer(vectorLayer);
  },
};
</script>
