(function( $ ){
  
  var methods = {
    init : function( options ) {

      return this.each(function(){
        
        var $this = $(this), data;
        
        if ( ! $this.data('parallapse') ) {
          $this.data('parallapse', { percent : 80, scroll_position : 0, max_movement : 0, offset_height : 0 });
        }
        
        data = $this.data('parallapse');
        
        if ( options ) { $.extend( data, options ); }
        
        data.max_movement = $.fn.parallapse.calc_max_movement(data.percent);
        
        $this.css({'position': 'fixed'});
        
        $(window).bind('resize.parallapse', {obj: $this}, methods.reposition);
        $(window).bind('scroll.parallapse', {obj: $this}, methods.reposition);
      });
      
    },
    reposition : function( event ) {
      var $this = event.data.obj, data = $this.data('parallapse');
      
      data.offset_height = ($(window).scrollTop() / $(document).height()) * data.max_movement;
      
      $this.css({ top: -data.offset_height });
    }
  };
  
  // Define the namespace for Parallapse
  $.fn.parallapse = function(method) {
    
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.parallapse' );
    }
    
  };
  
  $.fn.parallapse.calc_max_movement = function(percent) {
    return $(document).height() * (percent / 100);
  };
  
  function debug(obj) {
    if (window.console && window.console.log) {
      window.console.log(obj);
    }
  };
  
})( jQuery );