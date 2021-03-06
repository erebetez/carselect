'use strict';

Vue.component('car-item', {
  props: ['car'],
  template:
  `
    <car-card>
     <div class="card-header">
       <primary-title v-bind:text="car.title"></primary-title>
     </div>
     <div class="card-body bg-light">
      <div class="row">
      <div class="col-sm">
       <dl>
        <dt>km</dt>
        <dd>{{ car.km }}</dd>
        <dt>year</dt>
        <dd>{{ car.year }}</dd>
        <dt>garage</dt>
        <dd>{{ car.garage }}</dd>
        <dt>price</dt>
        <dd>{{ car.price }}</dd>
       </dl>
       <a v-bind:href="car.url" target="_blank">link</a>
       </div>
       <div class="col-sm">
       <img v-bind:src="car.img" alt="a car"></img>
       </div>
      </div>
     </div>
    </car-card>
  `
})

Vue.component('car-card', {
  template: `
   <li>
    <div class="card mt-3">
      <slot></slot>
    </div>
   </li>
  `
})

Vue.component('primary-title', {
  props: ['text'],
  template: '<h2 class="text-primary">{{ text }}</h2>'
})

Vue.component('cars-table', {
  props: ['cars'],
  data: function () {
    return {
        ordered: false,
        asc: false,
        active_car: false
    }
  },
  methods: {
      order_by: function(key) {
        var asc = this.asc
        function compare(a,b) {
            if (a[key] < b[key])
                return asc ? 1 : -1;
            if (a[key] > b[key])
                return asc ? -1 : 1;
            return 0;}
        this.ordered = key;
        this.asc = !this.asc;
        this.cars.sort(compare);
    },
    on_mouse_over: function(id){
          this.active_car = this.cars.find(function(car){
              return car.id === id;
          }
        )
    }
  },
  template:
  `
  <div class="row">

  <table class="table table-striped table-hover">
        <thead>
         <tr>
            <th v-on:click="order_by('title')">
            <sort-icon
               v-bind:column="'title'"
               v-bind:ordered="ordered"
               v-bind:asc="asc"></sort-icon>
               Title
            </th>
            <th v-on:click="order_by('km')">
            <sort-icon
               v-bind:column="'km'"
               v-bind:ordered="ordered"
               v-bind:asc="asc"></sort-icon>
               km
               </th>
            <th v-on:click="order_by('year')">
            <sort-icon
               v-bind:column="'year'"
               v-bind:ordered="ordered"
               v-bind:asc="asc">year</sort-icon>
               year
               </th>
            <th v-on:click="order_by('price')">
            <sort-icon
               v-bind:column="'price'"
               v-bind:ordered="ordered"
               v-bind:asc="asc"></sort-icon>
               price
               </th>
            <th></th>
         </tr>
        </thead>
        <tbody>
         <car-row
            v-for="car in cars"
            v-bind:car="car"
            v-on:mouse_over="on_mouse_over"
            v-bind:key="car.id">
         </car-row>
        </tbody>
  </table>
  <ul class="list-unstyled">
    <car-item
        v-if="active_car"
        v-bind:car="active_car"
        ></car-item>
  </ul>
 </div>
  `
})

Vue.component('sort-icon', {
   props: ['column', 'ordered', 'asc'],
   template: `
    <span v-if="column === ordered">
        <span id="asc" v-if="asc">
            <i class="fas fa-angle-down"></i>
        </span>
        <span id="desc" v-else>
            <i class="fas fa-angle-up"></i>
        </span>
    </span>
   `
})

Vue.component('car-row', {
    props: ['car'],
    template: `
         <tr>
            <td>{{ car.title }}</td>
            <td>{{ car.km }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.price }}</td>
            <td @mouseover="$emit('mouse_over', car.id)"><i class="fas fa-eye"></i></td>
        </tr>
        `
})
