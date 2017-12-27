require 'sinatra'
require_relative 'magical_hack'

URL_BASE = '/MagicalHack'

get URL_BASE do
  slim :main, :layout => false
end
