###Introduction

This gem allows you to write plain HTML views for your [Mithril](https://github.com/lhorie/mithril.js) applications, making it easier to collaborate with designers and other developers not familiar with the Mithril view syntax. It is based on the work that Jonathan Buchanan did on [MSX](https://github.com/insin/msx) and the [react-rails](https://github.com/reactjs/react-rails) gem.

It allows you to create views with a `.js.msx` extension.


Example: (app/assets/javascripts/todo.js.msx)
```
/** @jsx m */

todo.view = function(ctrl) {
    return <div class="dude">
        <input onchange={m.withAttr("value", ctrl.description)} type="text" class="blue" />
        <small class="pea">This is small text</small>
    </div>
};
```

Be sure to include the `/** @jsx m */` comment in your views.

###Installation

Add `gem "mithril_rails"` to your Gemfile.

You can then add Mithril to your asset manifest files with `//= require mithril`

### Unobtrusive JavaScript (Rewrite from [react-rails](https://github.com/reactjs/react-rails))

`mithril_ujs` will call `m.module` for every element with `data-mithril-class` attribute.
React properties can be specified by `data-react-props` attribute in JSON format. For example:

```erb
<!-- mithril_ujs will execute `m.module(node, HelloMessage)` -->
<div data-mithril-class="HelloMessage" data-mithril-props="<%= {name: 'Bob'}.to_json %>" />
```

To use `mithril_ujs`, simply `require` it after `mithril` (and after `turbolinks` if [Turbolinks](https://github.com/rails/turbolinks) is used):

```js
// app/assets/javascripts/application.js

//= require turbolinks
//= require mithril
//= require mithril_ujs
```

### View helper (Rewrite from [react-rails](https://github.com/reactjs/react-rails))

There is a view helper method `mithril_component`. It is designed to work with `mithril_ujs` and takes a Mithril component, properties, and HTML options as arguments:

```ruby
mithril_component('HelloMessage', name: 'John')
# <div data-mithril-class="HelloMessage" data-mithril-props="{&quot;name&quot;:&quot;John&quot;}"></div>
```

By default, a `<div>` element is used. Other tag and HTML attributes can be specified:

```ruby
mithril_component('HelloMessage', {name: 'John'}, :span)
# <span data-...></span>

mithril_component('HelloMessage', {name: 'John'}, {id: 'hello', class: 'foo', tag: :span})
# <span class="foo" id="hello" data-...></span>
```

###Development

This is the first release, more functionality to come, such as generating a scaffold for controllers and views for Mithril-based applications.
