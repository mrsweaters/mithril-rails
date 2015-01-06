$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "mithril_rails/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "mithril_rails"
  s.version     = MithrilRails::VERSION
  s.authors     = ["Jordan Humphreys"]
  s.email       = ["jordan@mailyard.net"]
  s.homepage    = "https://github.com/mrsweaters/mithril-rails"
  s.summary     = "Include Mithril in Rails"
  s.description = "Easily compile HTML into Rails views for Mithril."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "execjs", "~> 2.2.2"
  s.add_dependency "rails", ">= 3.2.0"

  s.add_development_dependency "sqlite3"
end
