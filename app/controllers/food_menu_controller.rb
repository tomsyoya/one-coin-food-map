class FoodMenuController < ApplicationController

  def top
    gon.hotpepper_access_key = ENV["HOTPEPPER_ACCESS_KEY"]
  end

  def search
    
  end

  def show
  end
  
  def index
  end

  private
    
end
