import { Component, OnInit } from '@angular/core';

declare var H: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  title = 'Library Location';
  lati: any;
  lngi: any;

  constructor() { }

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lati = position.coords.latitude;
        this.lngi = position.coords.longitude;
        console.info('lat : ' + this.lati);
        console.info('lng : ' + this.lngi);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }


    var icon = new H.map.Icon('assets/img/libr.png');
    document.getElementById('mapContainer').innerHTML = '';
    var platform = new H.service.Platform({
      'apikey': 'g3OImBdDbf2SqsXMhPTkM3I4nO9XDOgzlAN7CXa1kzo'
    });
    var maptypes = platform.createDefaultLayers();
    var options = {
      zoom: 15,
      center: {
        lat: 43.4796, lng: -80.5186
      }
    };
    var map = new H.Map(
      document.getElementById('mapContainer'),
      maptypes.vector.normal.map,
      options
    );
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    var target = new H.map.Marker({
      lat: 43.4796, lng: -80.5186
    }, {icon: icon});

    map.addObject(target);
  }

  public btnNavigate_click(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lati = position.coords.latitude;
        this.lngi = position.coords.longitude;
        console.info('lat : ' + this.lati);
        console.info('lng : ' + this.lngi);

        document.getElementById('mapContainer').innerHTML = '';
        var platform = new H.service.Platform({
          'apikey': 'g3OImBdDbf2SqsXMhPTkM3I4nO9XDOgzlAN7CXa1kzo'
        });
        var router=platform.getRoutingService();
        var maptypes = platform.createDefaultLayers();

        var options = {
          zoom: 14,
          center: {lat: this.lati, lng: this.lngi}
        };

        var map = new H.Map(
          document.getElementById('mapContainer'),
          maptypes.vector.normal.map,
          options
        );
        var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
        var walk = new H.map.Icon('assets/img/walk.png');
        var marker = new H.map.Marker({
          lat: this.lati, lng: this.lngi
        }, {icon: walk});

        map.addObject(marker);

        var libr = new H.map.Icon('assets/img/libr.png');
        var target = new H.map.Marker({
          lat: 43.4796, lng: -80.5186
        }, {icon: libr});

        map.addObject(target);

        var startpoint={
          lat:this.lati,
          lng:this.lngi
        }
        var endpoint={
          lat:43.4796,
          lng:-80.5186
        }

        var onSuccess = function(result){
          var route,routeShape,startPoint,endPoint,lineString;
          if(result.response.route){
            route=result.response.route[0];
            routeShape=route.shape;
            lineString = new H.geo.LineString();
            routeShape.forEach(function(point){
              var parts=point.split(',');
              lineString.pushLatLngAlt(parts[0],parts[1]);
            });
            var routeLine=new H.map.Polyline(lineString,{
              style:{
                strokeColor:'blue',
                lineWidth:'8'
              }
            });
            map.addObject(routeLine);

          }

        };
        var onError = function(error){
          console.error("There was some errors!",error);
        }
        var routerOptions={
          mode:'fastest;car',
          representation:'display',
          waypoint0:this.LocationToWaypointString(startpoint),
          waypoint1:this.LocationToWaypointString(endpoint)
        };
        router.calculateRoute(routerOptions,onSuccess,onError);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }


  }

    public LocationToWaypointString(coordinates){
      return 'geo!'+coordinates.lat+','+coordinates.lng;
    }

}
