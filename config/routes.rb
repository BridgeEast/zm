Zm::Application.routes.draw do



 resources :managements do
   collection do

   ## guest & virtual
     get "check_guest_order"
     get "guest_order"
     get "get_guest_details"
     get "get_virtuals"
     get "get_virtual_daily_dispatch"
     get "get_virtual_mouth_sheet"
     get "get_virtual_mouth_dispatch"
     get "get_virtual_daily_sheet"
     get "get_order_progress"
     get "get_guest_order"
     get "check_virtual_warehouse"
     get "get_tree_node"
   ################

     get "check_store_of_shoes"
     get "get_data"
     get "get_check_store_of_shoes"
     get "get_details"

     get "get_check_shoes"
     get "get_details_of_shoes"
     get "get_check_orders"
     get "get_shoes_size_num"

     get "check_factory_order"
     get "get_cfo_grid"

     get "check_wish_list"
     get "get_cwl_grid"
     get "check_advanced_order"
     get "get_cao_grid"

     post "open_order"
   end
 end

  resources :guests do
   collection do

     get"scanning_store_of_shoes"
     get"get_general_shoes"
     get"load_tree"
     get"get_scanning_detail"
     #*********心愿单****************
     get"change_board_kind"
     get "wish_list"
     get "wish_list_data"
     post "destroy_choice"
     post "add_to_determined_board"
     #*******************************

   end
 end
#----------------------------------------aji
 resources :services do
   collection do
     get "excelProcessingAndPlayBoard"
     get "get_excel_shoes"
     get "scanningGuestWishLists"
     post "delete_shoes_and_detail_of_shoes"
     get "get_details_of_shoes"
     get "guest_order_management"
     get "get_orders"
     get "get_order_data"
     get "get_order_shoes_detail"
     post "create_in_generalanddetail"
     post "updata_in_generalanddetail"
     get "get_details_of_shoes_all_id"
     post "updata_in_play_board"
     post "create_in_generalanddetail"
     post "updata_in_generalanddetail"
     get "get_details_of_shoes_all_id"
   end
 end

 match "home_menu" => "acts_as_menus#home_menu"
 match "f_menu_win" => "acts_as_menus#f_menu_win"
 match "s_menu_win" => "acts_as_menus#s_menu_win"
 match "t_menu_win" => "acts_as_menus#t_menu_win"
 match "c_menu_win" => "acts_as_menus#c_menu_win"
      

  get "users/index"

  resources :products

  devise_for :users do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  root :to => "acts_as_menus#home_menu"
  match ":controller/:action"
  match ":controller(/:action(/:id(.:format)))"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
