require 'execjs'
require 'mithril_rails/msx/template'
require 'rails'

module MithrilRails
  module MSX
    def self.context
      # lazily loaded during first request and reloaded every time when in dev or test
      unless @context && ::Rails.env.production?
        contents =
          # If execjs uses therubyracer, there is no 'global'. Make sure
          # we have it so JSX script can work properly.
          'var global = global || this;' +

          # search for transformer file using sprockets - allows user to override
          # this file in his own application
          File.read(::Rails.application.assets.resolve('MSXTransformer.js'))

        @context = ExecJS.compile(contents)
      end

      @context
    end

    def self.transform(code)
      result = context.call('JSXTransformer.transform', code, options)
      return result['code']
    end

    def self.options
      @options ||= if File.exist?(::Rails.root.join("config/mithril-rails.yml"))
                     YAML.load(ERB.new(File.read(::Rails.root.join("config/mithril-rails.yml"))).result)
                   else
                     {}
                   end
      @options
    end

  end
end
