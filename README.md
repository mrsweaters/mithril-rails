###Introduction

This project rocks and uses MIT-LICENSE. This gem is based on the work that Jonathan Buchanan did on MSX and the react-rails gem.

It allows you to create views with a `.js.msx` extension.


Example: (app/assets/todo.js.msx)
```
/** @jsx m */

todo.view = function(ctrl) {
    return <div class="dude">
        <input onchange={m.withAttr("value", ctrl.description)} type="text" class="blue" />
        <small class="pea">This is small text</small>
    </div>
};
```

###Installation

Add `gem "mithril-rails"` to your Gemfile.
