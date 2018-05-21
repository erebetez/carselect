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
  template:
  `
  <table class="table table-striped table-hover">
         <thead>
          <tr>
            <th>Title</th>
            <th>km</th>
            <th>year</th>
            <th>price</th>
         <tr>
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
