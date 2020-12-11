<template>
  <div>
    <div id="map" class="map">
      <div id="mouse-position" class="mouse-position"></div>
      <div id="popup" class="ol-popup">
        <a href="#" id="popup-closer" class="ol-popup-closer"></a>
        <div id="popup-content"></div>
      </div>
    </div>
    <button id="out" @click="zoom_out()">zoom-out</button>
    <button id="in" @click="zoom_in()">zoom-in</button>
    <button id="chagan" @click="chagan()">跳转到查干苏布日嘎</button>
    <div class="zoomNum">
      <span>当前层级：{{ zoom }}</span>
    </div>
    <div>
      <button @click="Addmarker()">添加图片标注</button>
    </div>
  </div>
</template>
<script>
import ol from "openlayers";
export default {
  name: "Openlayers2",
  data() {
    return {
      map: null,
      view: null,
      zoom: 15,
      addVectorLabel: null,
    };
  },
  methods: {
    zoom_out() {
      // 获取与此地图关联的视图
      var view = this.map.getView();
      // 获取当前的缩放级别
      var zoom = view.getZoom();
      // 设置zoom
      var zoomNum = zoom - 1;
      view.setZoom(zoomNum);
      if (zoom >= 1) {
        this.zoom = zoomNum;
      } else {
        this.zoom = 0;
      }
    },
    zoom_in() {
      // 获取与此地图相关的视图
      var view = this.map.getView();
      // 获取当前的缩放级别
      var zoom = view.getZoom();
      // 设置zoom
      var zoomNum = zoom + 1;
      view.setZoom(zoomNum);
      this.zoom = zoomNum;
    },
    chagan() {
      // ol.proj.fromLonLat 将原坐标转换为其他坐标
      var chagan = ol.proj.fromLonLat([101.197899, 41.994443]);
      //   动画
      this.view.animate({
        //   动画结束时，视图的中心
        center: chagan,
        // 动画持续的时间
        duration: 2500,
      });
    },
    Addmarker() {
      // 为地图容器添加单击事件监听
      let a = this.map.on("click", (evt) => {
        // 鼠标单击点坐标
        var point = evt.coordinate;
        // 添加一个新的标注
        this.addVectorLabel(point);
        // 移除监听事件
        ol.Observable.unByKey(a);
      });
    },
  },
  mounted() {
    var beijing = ol.proj.fromLonLat([116.3915, 39.907]);
    //  ol.View对象表示地图的简单2D视图
    this.view = new ol.View({
      // 设置地图初始中心
      center: beijing,
      // 设置缩放级别
      zoom: this.zoom,
      // 设置投影 projection (默认值：EPSG:3857)
      //   projection: "EPSG:4326",
    });
    // 实例化鼠标控件
    var mousePositionControl = new ol.control.MousePosition({
      // 坐标格式
      // ol.coordinate.createStringXY(4) 括号里指定 保留几位小数
      // ol.coordinate.createStringXY() 返回一个函数 ol.CoordinateFormatType()，该函数可用于将{ol.Coordinate}格式化为字符串。
      coordinateFormat: ol.coordinate.createStringXY(4),
      // 地图投影坐标系
      projection: "EPSG:4326",
      // 坐标信息显示样式类名，默认是'ol-mouse-position'
      className: "custom-mouse-position",
      // 显示鼠标位置信息的目标容器
      target: document.getElementById("mouse-position"),
      // 未定义坐标的标记
      undefinedHTML: "&nbsp;",
    });
    // 实例化比例尺控件
    var scaleLineControl = new ol.control.ScaleLine({});
    // 地图的核心组件，要渲染地图，需要视图，一个或多个图层 和 一个目标容器
    // 实例化Map对象加载地图
    this.map = new ol.Map({
      // 加载控件到地图容器中
      controls: ol.control.defaults().extend([
        //   ol.control.fullscreen提供一个按钮，单击该按钮可使地图全屏显示
        new ol.control.FullScreen(),
        // 加载鼠标位置控件
        mousePositionControl,
        // 加载比例尺控件
        scaleLineControl,
      ]),
      view: this.view,
      layers: [
        // 使用ol.layer.Tile来创建地图
        new ol.layer.Tile({
          // 以显示 ol.source.OSM OSM数据并将其呈现给ID为的DOM元素map
          // ol.source.OSM是OpenStreetMap切片服务器的图层源。
          // source: new ol.source.OSM(),
          source: new ol.source.XYZ({
            url:
              "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
          }),
        }),
      ],
      // 地图的容器，元素本身 或 id元素
      target: "map",
      loadTilesWhileAnimating: true,
    });
    // 获取与此地图相关的视图,获取当前缩放级别
    this.zoom = this.map.getView().getZoom();
    // 创建矢量标注样式函数，设置 image 为图标  ol.style.Icon
    var createLabelStyle = (feature) => {
      return new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1.3],
          // anchorOrigin: "top-right",
          // offset:[0,10],
          //图标缩放比例
          // scale:0.5,
          //透明度
          opacity: 1,
          src: "https://www.easyicon.net/api/resizeApi.php?id=1192128&size=16",
        }),
        text: new ol.style.Text({
          // 文字样式
          font: "normal 14px 微软雅黑",
          // 文本内容
          text: feature.get("name"),
          // 文本填充样式
          fill: new ol.style.Fill({ color: "#aa3300" }),
          stroke: new ol.style.Stroke({ color: "#ffcc33", width: 2 }),
        }),
      });
    };
    //  实例化 Vector 要素，通过矢量图层添加到地图容器中
    var tiananmen = ol.proj.fromLonLat([116.3915, 39.907]);
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(tiananmen),
      // 名称属性
      name: "天安门",
    });
    iconFeature.setStyle(createLabelStyle(iconFeature));
    // 矢量标注的数据源
    var vectorSource = new ol.source.Vector({
      features: [iconFeature],
    });
    // 矢量标注图层
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });
    // 添加一个新的标注(矢量要素)
    this.addVectorLabel = (coordinate) => {
      // 创建一个要素 ol.feature
      var newFeature = new ol.Feature({
        //几何信息
        geometry: new ol.geom.Point(coordinate),
      });
      // 设置要素的样式
      newFeature.setStyle(createLabelStyle(newFeature));
      // 将新要素添加到数据源中
      vectorSource.addFeature(newFeature);
    };

    //  添加到 map 层
    this.map.addLayer(vectorLayer);
    //
  },
};
</script>
<style lang="scss">
// 比例尺
.ol-scale-line {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background-color: rgba(0, 60, 136, 0.4);
  border-radius: 4px;
  padding: 2px;
}
// 比例尺字体颜色样式
.ol-scale-line-inner {
  border: 1px solid #eee;
  border-top: none;
  color: #eee;
  font-size: 10px;
  text-align: center;
  margin: 1px;
}
.zoomNum {
  margin: 0 auto;
}
.mouse-position {
  float: left;
  position: absolute;
  bottom: 8px;
  left: 8px;
  width: 150px;
  height: 20px;
  z-index: 2000;
}
/* 鼠标位置信息自定义样式设置 */
.custom-mouse-position {
  color: rgb(0, 0, 0);
  font-size: 16px;
  font-family: "微软雅黑";
}
.map {
  width: 100%;
  height: 500px;
  position: relative;
}
.ol-zoom-in {
  position: absolute;
  top: 0;
  left: 0;
}
.ol-zoom-out {
  position: absolute;
  top: 20px;
  left: 0;
}
.ol-full-screen-false {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
