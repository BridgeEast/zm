Zm::Application.routes.draw do

  
 resources :acts_as_menus do
   collection do
     get "home_menu"
     get "f_menu_win" 
     get "s_menu_win" 
     get "t_menu_win" 
     get "c_menu_win" 
     post "f_menu_create"
     post "s_menu_create"
     post "t_menu_create"
     post "c_menu_update"
     post "update_f_menu"
     post "update_s_menu"
     post "update_t_menu"
   end
   member do
     get "update_f_menu_win"
     get "update_s_menu_win"
     get "update_t_menu_win"
   end
 end

 resources :data_bases do
   collection do
     get "region"
     get "get_region"
     post "create_region"
     post "delete_region"
     post "update_region"
     get "material"
     get "get_material"
     post "create_material"
     post "delete_material"
     post "update_material"
     get "color"
     get "get_color"
     post "create_color"
     post "delete_color"
     post "update_color"
     get "procession"
     get "get_procession"
     post "create_procession"
     post "delete_procession"
     post "update_procession"
     get "store_of_shoes"
     get "get_general_shoes"
     post "update_shoes"
     post "delete_shoes"
     post "create_shoes"
     get "get_details_of_shoes"
     post "create_details_of_shoes"
     post "create_shoes_and_details_of_shoes"

   end
 end






 resources :managements do
   collection do

   ## guest & virtual
     get "csos_paging"
     get "check_guest_order"
     get "get_check_guest_order"
     get "get_selected_data"
     get "check_shoes"
     get "get_cgo_check_details"
     get "get_order_progress"
     get "get_virtuals"
     get "get_virtual_daily_dispatch"
     get "get_virtual_mouth_sheet"
     get "get_virtual_mouth_dispatch"
     get "get_virtual_daily_sheet"
     get "check_virtual_warehouse"
   ################

   #**********查看鞋库************
     get "check_store_of_shoes"
     get "get_data"
     get "get_check_store_of_shoes"
     get "get_csos_check_details"
     get "csos_paging"
   #*******************************

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
######################我的别动######################
     get"scanning_store_of_shoes"
     get"get_general_shoes"
     get"load_tree"
     get"get_scanning_detail"

     #*********心愿单****************
     get "get_details"
     get "wish_list"
     get "wish_list_data"
     post "destroy_choice"
     post "add_to_determined_board"
     post "add_to_order"
    
     post"change_board_kind"
     get "get_data"


     #********订单管理***************
     get"order_management"
     get"get_details_of_shoes"
     post"delete_undetermined_order"
   end
 end
#----------------------------------------aji/jb

 resources :services do
   collection do
     #-----------------------------------aji
     get "excelProcessingAndPlayBoard"
     get "get_excel_shoes"
     post "delete_shoes_and_detail_of_shoes"
     ############################我的别动############################
     get "get_details_of_shoes"
     post "create_in_generalanddetail"
     post "updata_in_generalanddetail"
     get "get_details_of_shoes_all_id"
     post "updata_in_play_board"
     get "get_tree_node"
     get "scanningGuestWishLists"
     post "upload_photo"

     #--------------------------------------jb
     get "guest_order_management"
     get "get_orders"
     get "get_order_data"
     get "get_order_shoes_detail"

     ################################################################

     post "create_in_generalanddetail"
     post "updata_in_generalanddetail"
     get "get_details_of_shoes_all_id"
     get "factory_order"
     get "get_factory_order"
     get "get_check_shoes"
     post "mps"
     get "get_speed_of_progress"

     ########################浏览客户心愿单############################

     get "scanning_guest_wish_list"
     get "get_selected_data"
     get "get_scanning_guest_wish_list"
     get "get_sgwl_check_details"
     get "sgwl_paging"  
     ################################################################


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
