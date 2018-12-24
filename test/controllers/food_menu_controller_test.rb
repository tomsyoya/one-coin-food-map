require 'test_helper'

class FoodMenuControllerTest < ActionDispatch::IntegrationTest
  test "should get map" do
    get food_menu_map_url
    assert_response :success
  end

  test "should get index" do
    get food_menu_index_url
    assert_response :success
  end

end
