# Deployment uses SFTP by default when you use deploy_via :copy, and there
# doesn't seem to be any way to configure it.  Unfortunately, we don't run
# SFTP on our servers, so it fails.  This forces it to use SCP instead.
# http://www.capify.org/index.php/OverridingTaskCommands
#
module UseScpForDeployment
  def self.included(base)
    base.send(:alias_method, :old_upload, :upload)
    base.send(:alias_method, :upload,     :new_upload)
  end
  
  def new_upload(from, to)
    old_upload(from, to, :via => :scp)
  end
end

Capistrano::Configuration.send(:include, UseScpForDeployment)

set :application, "paulkaplan" # Application name.
set :location, "atlas" # Web server url.
set :user, "plkap74" # Remote user name. Must be able to log in via SSH.
set :port, 7124 # SSH port. Only required if non default ssh port used.
set :use_sudo, false # Remove or set the true if all commands should be run through sudo.

set :local_user, "plkap74" # Local user name.

set :deploy_to, "~/www/#{application}"
set :deploy_via, :copy # Copy the files across as an archive rather than using Subversion on the remote machine.
set :copy_dir, "/tmp/capistrano" # Directory in which the archive will be created. Defaults to /tmp. Note that I had problems with /tmp because on my machine it's on a different partition to the rest of my filesystem and hence a hard link could not be created across devices.
set :copy_remote_dir, "/tmp/capistrano" # Directory on the remote machine where the archive will be copied. Defaults to /tmp.

# Use without Subversion on local machine.
set :repository,  "./_site"
set :scm, :none

# Use with Subversion on local machine.
# set :repository,  "file:///home/#{local_user}/repositories/#{application}/public"
# set :copy_cache, "#{copy_dir}/#{application}" # Directory in which the local copy will reside. Defaults to /tmp/#{application}. Note that copy_dir must not be the same as (nor inside) copy_cache and copy_cache must not exist before deploy:cold.
# set :copy_exclude, [".svn", "**/.svn"] # Prevent Subversion directories being copied across.

role :app, location
role :web, location
role :db,  location, :primary => true

# Override default tasks which are not relevant to a non-rails app.
namespace :deploy do
  task :migrate do
    puts "    not doing migrate because not a Rails application."
  end
  task :finalize_update do
    puts "    not doing finalize_update because not a Rails application."
  end
  task :start do
    puts "    not doing start because not a Rails application."
  end
  task :stop do 
    puts "    not doing stop because not a Rails application."
  end
  task :restart do
    puts "    not doing restart because not a Rails application."
  end
end

# Custom tasks for our hosting environment.
namespace :remote do

  desc <<-DESC
    Create directory required by copy_remote_dir.
  DESC
  task :create_copy_remote_dir, :roles => :app do
    print "    creating #{copy_remote_dir}.\n\n\n\n\n"
    run "mkdir -p #{copy_remote_dir}"
  end

  desc <<-DESC
    Create a symlink to the application.
  DESC
  task :create_symlink, :roles => :web do
    current_path = "/var/www/#{application}/"
    run "mkdir -p #{current_path}"
    run "mkdir -p #{current_path}releases"
    print "    creating symlink from releases to #{current_path}.\n"
    # puts release_path, current_path
    run "rm -rf #{current_path[0..-2]}"
    run "ln -s #{release_path} #{current_path[0..-2]}"
    run "chmod 777 #{current_path}"
  end
  
end

# Custom tasks for our local machine.
namespace :local do
  desc <<-DESC
    Run jekyll to update static _site
  DESC
  task :jekyllize, :roles => :web do
    print "   running 'jekyll' to update _site"
    run "jekyll"
  end
  
  desc <<-DESC
    Create directory required by copy_dir.
  DESC
  task :create_copy_dir do
    print "    creating #{copy_dir}.\n"
    system "mkdir -p #{copy_dir}"
  end

end

# Callbacks.
before 'deploy:setup','local:create_copy_dir', 'remote:create_copy_remote_dir'
after 'deploy:restart', 'remote:create_symlink'