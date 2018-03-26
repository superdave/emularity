function media_initializer(id) {
  return function() {
    tmpl = document.getElementById(id);
  
    media_periphs = emulator.attached.peripherals;
    media_images = emulator.attached.media;
  
    for(var key in media_periphs) {
      // Get the human readable title.
      var title = media_periphs[key];
    
      // Clone the base select box.
      var box = tmpl.content.cloneNode(true);
    
      // Set the box ID.
      box.id = "media-select-" + key;
    
      // Get the label and set its ID and content.
      var label = box.querySelector(".media-label");
      label.id = "media-label-" + key;
      label.innerHTML = key + " media:";
    
      // Get the select box and change its ID.
      var menu = box.querySelector(".media-select");
      menu.id = "media-select-" + key;
    
      // Fill out the menu, starting at the next available index.
      for(title in media_images) {
        var path = media_images[title];
      
        // Create the option and fill out the value/title.
        var opt = document.createElement("option");
        opt.text = title;
        opt.value = path;
        menu.options.add(opt);
      
        // If this is currently inserted in this peripheral, set the menu.
        if(path == media_periphs[key]) menu.selectedIndex = menu.length - 1;
      }
    
      // Set the onchange function for the selector.
      menu.onchange = function() {
        var sel = menu.value;
        alert("Peripheral " + key + ": insert \"" + sel + "\"");
      
        // This will eventually exist.
        if(media_change in emulator) emulator.media_change(key, sel);
      }
    
      // Set the onclick function for the eject button.
      button = box.querySelector(".media-eject");
      button.onclick = function() {
        // The zero index is always the empty drive.
        menu.selectedIndex = 0;
      
        // Always fire the onchange; it shouldn't hurt if we try to eject
        // from an empty drive.
        menu.onchange.call();
      }
    
      tmpl.parentNode.appendChild(box);
    }
  }
}
    