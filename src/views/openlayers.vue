<template>
  <div>
    <div id="map" class="map"></div>
    <button id="pan-to-london">Pan to London</button>
    <button id="pan-to-chagan">Pan to 查干苏布日嘎</button>
    <button id="zoom-out">zoom out</button>
    <button id="zoom-in">zoom in</button>
  </div>
</template>
<script>
export default {
  name: "Openlayers",
  data() {
    return {
      map: null,
    };
  },
  methods: {},
  mounted() {
    this.ol = ol;
    var view = new ol.View({
      projection: "EPSG:3857", // 投影。默认值为EPSG:3857，也可以设置EPSG:
      center: [114.064839, 22.548857], // 视图的初始中心。中心的坐标系由projection选项指定。默认undefined
      zoom: 12,
    });
    this.map = new ol.Map({
      view: view,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
      ],
      target: "map", // 地图的容器，元素本身或id元素的
      loadTilesWhileAnimating: true,
    });
    document.getElementById("zoom-out").onclick = () => {
      var view = this.map.getView();
      var zoom = view.getZoom();
      view.setZoom(zoom - 1);
    };
    document.getElementById("zoom-in").onclick = () => {
      var view = this.map.getView();
      var zoom = view.getZoom();
      view.setZoom(zoom + 1);
    };
    // 跳转到伦敦的坐标
    var london = ol.proj.fromLonLat([-0.12755, 51.507222]);
    // 跳转到查干苏布日嘎
    var chagan = ol.proj.fromLonLat([101.197899, 41.994443]);
    function onClick(id, callback) {
      document.getElementById(id).addEventListener("click", callback);
    }
    onClick("pan-to-london", () => {
      // 动画
      view.animate({
        center: london, // 动画结束时，视图的中心
        duration: 2500, // 动画持续的时间
      });
    });
    onClick("pan-to-chagan", () => {
      // 动画
      view.animate({
        center: chagan, // 动画结束时，视图的中心
        duration: 2500, // 动画持续的时间
      });
    });
    // 创建图标特性
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point([0, 0], "XY"),
      name: "my icon",
    });
    // 创建空的矢量容器
    var vectorSource = new ol.source.Vector({});
    // 将图标特性添加到矢量中
    vectorSource.addFeature(iconFeature);
    // 创建图标样式
    var iconStyle = new ol.style.Style({
      image: new ol.style.Icon({
        opacity: 0.75,
        src: "https://www.easyicon.net/api/resizeApi.php?id=504679&size=128",
      }),
    });
    // 创建矢量层
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
      style: iconStyle,
    });
    // 添加进map层
    this.map.addLayer(vectorLayer);
  },
};
</script>
<style lang="scss">
.map {
  width: 100%;
  height: 500px;
}
</style>
