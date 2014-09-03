module MithrilRails
  module Rails
    class Railtie < ::Rails::Railtie
      # Watch .msx files for changes in dev, so we can reload the JS VMs with the new JS code.
      initializer "mithril_rails.add_watchable_files" do |app|
        app.config.watchable_files.concat Dir["#{app.root}/app/assets/javascripts/**/*.msx*"]
      end

      # Include the react-rails view helper lazily
      initializer "mithril_rails.setup_view_helpers" do
        ActiveSupport.on_load(:action_view) do
          include ::Mithril::Rails::ViewHelper
        end
      end
    end
  end
end
