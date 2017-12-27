module MagicalHack

  def self.local_js_scripts
    file_paths = Dir['./lib/public/js/**/*.js']
    file_paths.map! do |file_path|
      file_path.sub! './lib/public', ''
      "<script src='#{file_path}'></script>"
    end
    file_paths.join ''
  end

end