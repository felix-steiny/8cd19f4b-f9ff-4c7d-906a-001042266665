require 'sinatra'
require_relative 'magical_hack'

URL_BASE = '/MagicalHack'

get URL_BASE do
  slim :main, :layout => false
end

get URL_BASE + '/js' do
  content_type 'text/javascript'
  MagicalHack.concat_js_scripts
end