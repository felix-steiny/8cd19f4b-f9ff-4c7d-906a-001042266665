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

    result = 'MagicalHack = function() {' + "\n"
    result << "var MH = {};\n"
    result << "MH.Public = {};\n"
    MagicalHack.get_all_namespaces_depth_order file_paths do |namespace|
      result << "MH.#{namespace} = {};\n"
    end

    file_paths.each do |file|
      file = File.open(file, 'r').read
      file.each_line do |line|
        result << line
      end
      result << "\n"
    end

    result << "\n" + 'return MH.Public;'
    result << "\n" + '}();'
    result << "\n" + '$(document).ready(MagicalHack.initialize);'

    result
  end

  def self.get_all_namespaces_depth_order file_paths
    all_namespaces = file_paths.map { |path| get_file_namespaces(path) }
    by_depth = []

    all_namespaces.each do |ns_arr|
      by_depth[ns_arr.length] ||= []
      by_depth[ns_arr.length].push(ns_arr.join('.'))
    end

    by_depth.each do |depth|
      depth.uniq.each { |ns| yield ns unless ns.empty? }
    end
  end

  def self.get_file_namespaces file_path
    path_with_js_folder = file_path.sub('./lib/public/js/', '')
    path_pieces = path_with_js_folder.split('/')
    path_pieces.pop
    path_pieces.map! { |ns| snake_case_to_pascal(ns) }
  end

  def self.snake_case_to_pascal identifier
    identifier
      .split('_')
      .map { |s| s.capitalize }
      .join()
  end

end