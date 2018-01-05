module MagicalHack

  def self.local_js_scripts
    file_paths = Dir['./lib/public/js/**/*.js']
    file_paths.map! do |file_path|
      file_path.sub! './lib/public', ''
      "<script src='#{file_path}'></script>"
    end
    file_paths.join ''
  end

  def self.concat_js_scripts
    file_paths = Dir['./lib/public/js/**/*.js']

    result = ''

    file_paths.each do |file|
      file = File.open(file, 'r').read
      file.each_line do |line|
        result << line
      end
    end

    result
  end

end