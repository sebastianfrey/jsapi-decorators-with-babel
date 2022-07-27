import { aliasOf, subclass } from '@arcgis/core/core/accessorSupport/decorators';
import Collection from '@arcgis/core/core/Collection';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import Layer from '@arcgis/core/layers/Layer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { initWidgets } from './widgets';

@subclass('app.CustomGroupLayer')
class CustomGroupLayer extends GroupLayer {
  @aliasOf('layers')
  sublayers!: Collection<Layer>;
}

const featureLayer = new FeatureLayer({
  url: 'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0',
});

const customGroupLayer = new CustomGroupLayer({ title: 'GroupLayer' });

customGroupLayer.sublayers.add(featureLayer);

featureLayer.when(() => {
  view.goTo(featureLayer.fullExtent);
});

const view = new MapView({
  container: 'viewDiv',
  map: new Map({
    basemap: 'arcgis-topographic',
    layers: [customGroupLayer],
  }),
});

view.when(() => initWidgets({ view, layer: featureLayer }));
