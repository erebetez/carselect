'use strict';

Vue.component('car-item', {
  props: ['car'],
  template:
  `
    <car-card>
     <primary-title v-bind:text="car.title"></primary-title>
     <div class="row">
      <div class="col-sm">
       <dl>
        <dt>km</dt>
        <dd>{{ car.km }}</dd>
        <dt>year</dt>
        <dd>{{ car.year }}</dd>
        <dt>price</dt>
        <dd>{{ car.price }}</dd>
       </dl>
       <a v-bind:href="car.url" target="_blank">link</a>
      </div>
      <div class="col-sm">
       <img v-bind:src="car.img" alt="a car"></img>
      </div>
     </div>
    </car-card>
  `
})

Vue.component('car-card', {
  template: `
   <li>
    <div class="border-left border-primary bg-light p-2 m-3">
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
        asc: false
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
    seen: function(key) {
        return key == this.ordered
    }
  },
  computed: {
    icon: function() {
        return this.asc ? "fas fa-angle-down" : "fas fa-angle-up"
    }
  },
  template:
  `
  <table class="table table-striped table-hover">
        <thead>
         <tr>
            <th v-on:click="order_by('title')"><i v-if="seen('title')" v-bind:class="icon"></i>Title</th>
            <th v-on:click="order_by('km')"><i v-if="seen('km')" v-bind:class="icon"></i>km</th>
            <th v-on:click="order_by('year')"><i v-if="seen('year')" v-bind:class="icon"></i>year</th>
            <th v-on:click="order_by('price')"><i v-if="seen('price')" v-bind:class="icon"></i>price</th>
         </tr>
        </thead>
        <tbody>
         <car-row
            v-for="car in cars"
            v-bind:car="car"
            v-bind:key="car.id">
         </car-row>
        </tbody>
  </table>
  `
})

// Vue.component('column-caption',{
//     props: ['key']
//     template:
//        '<th v-on:click="order_by('title')"><i v-if="seen('title')" v-bind:class="icon"></i>Title</th>'
//     }
// )

Vue.component('car-row', {
    props: ['car'],
    template: `
         <tr>
            <td>{{ car.title }}</td>
            <td>{{ car.km }}</td>
            <td>{{ car.year }}</td>
            <td>{{ car.price }}</td>
        </tr>
        `
})
