###Introduction

This gem allows you to write plain HTML views for your [Mithril-based](https://github.com/lhorie/mithril.js) applications, making it easier to collaborate with designers and other developers not familiar with the Mithril view syntax. It is based on the work that Jonathan Buchanan did on [MSX](https://github.com/insin/msx) and the [react-rails](https://github.com/reactjs/react-rails) gem.

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

Be sure to include the `/** @jsx m **/` comment in your views.

###Installation

Add `gem "mithril_rails"` to your Gemfile.

You can then add Mithril to your asset manifest files with `//= require mithril`

###Development

This is the first release, more functionality to come, such as generating a scaffold for controllers and views for Mithril-based applications.
