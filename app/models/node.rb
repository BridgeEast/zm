class Node < ActiveRecord::Base
    def childCount
        result = Node.find(:all, :conditions => "nodeparent=#{id}")
        return result.size
    end

    def to_json(*a)
      {
        'nodeid' => id,
        'nodetext' => nodetext,
        'nodeparent' => nodeparent,
        'childCount' => childCount,
      }.to_json(*a)
    end
end


