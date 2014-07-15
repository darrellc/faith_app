class EventTemplatesController < ApplicationController
  before_filter :set_view_path, :print_action
  load_and_authorize_resource
  
  def create
    
  end
  
  def set_view_path
    @view_path = "account/events/"
  end
  
  def print_action
    puts "<<<<<<<<<<<<<<<<<<<<#{controller_name}-#{action_name}>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"
  end
  
end 