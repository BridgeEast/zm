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
####### 好，这部分是我的路由,不要改我的 ###########
     get "check_guest_order"
     get "get_daily_sheet"
     get "get_guest_order"
     get "check_virtual_warehouse"
     get "get_tree_node"
     get "get_check_guest_order"
     get "get_check_virtual_warehouse"
     get "get_check_virtual_warehouse_node"
     get "get_detail"
####### 好，这部分是我的路由 ######################

     get "check_store_of_shoes"
     get "get_data"
     get "get_check_store_of_shoes"
     get "get_details"

     get "get_check_shoes"
     get "get_details_of_shoes"
     get "get_check_orders"

     get "check_factory_order"
     get "get_cfo_grid"
     get "check_wish_list"
     get "get_cwl_grid"
     get "check_advanced_order"
     get "get_cao_grid"
   end
 end

 resources :services do
   collection do
     get "excelProcessingAndPlayBoard"
     get "get_excel_shoes"
     get "scanningGuestWishLists"
     post "delete_shoes_and_detail_of_shoes"
     
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
