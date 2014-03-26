var ChatModule = (function(){
	/**
	*	Configuration parameters
	*	refreshTime: is the time in ms after which the chat is reloaded. Default 1000
	*	saveMessageUrl: the url to call for saving a message
	*	loadMessageUrl: the url to call for loading the chat messages
	*	onMessageSaved: the default callback which will be called when a message is saved
	*	onMessagesLoaded: the default callback which will be called when the messages are loaded
	*	onMessagesCount: the default callback which will be called when counting the chat messages
	*	@var object
	*/
	var configuration = {
		refreshTime: 1000,
		saveMessageUrl: "",
		loadMessageUrl: "",
		countMessageUrl: "",
		onMessageSaved: function(){},
		onMessagesLoaded: function(){},
		onMessagesCount: function(){}
	};
	
	/**
	*	Set the configuration parameters
	*/
	var setConfigurationParameters = function(parameters){
		for(var key in configuration){
			if(parameters[key]){
				configuration[key] = parameters[key];
			}
		}
	};
	
	/**
	*	The timer used on messages loading
	*	@var object
	*/
	var timerMessages = null;
	
	/**
	*	The timer used on messages counting
	*	@var object
	*/
	var timerCount = null;
	
	/**
	*	Clear the specified timer
	*/
	var clearTimer = function(timer){
		clearInterval(timer);
		timer = null;
	}
	
	return {
		/**
		*	Save the message written
		*/
		saveMessage: function(messageData, endSaving){
			$.ajax({
				type: "POST",
				url: configuration.saveMessageUrl,
				data: messageData,
				success: function(response){
					if(endSaving){
						endSaving(response);
					}
					else{
						configuration.onMessageSaved(response);
					}
				}
			});
		},
		
		/**
		*	Load all chat messages
		*/
		loadMessages: function(chatData, endLoading){
			clearTimer(timerMessages);
			
			timerMessages = setInterval(function(){
				$.ajax({
					type: "POST",
					url: configuration.loadMessageUrl,
					data: chatData,
					success: function(response){
						if(endLoading){
							endLoading(response);
						}
						else{
							configuration.onMessagesLoaded(response);
						}
					}
				});
			}, configuration.refreshTime);
		},
		
		/**
		*	Count the chat messages
		*/
		countMessages: function(chatData, endCounting){
			clearTimer(timerCount);
			
			timerCount = setInterval(function(){
				$.ajax({
					type: "POST",
					url: configuration.countMessageUrl,
					data: chatData,
					success: function(response){
						if(endCounting){
							endCounting(response);
						}
						else{
							configuration.onMessagesCount(response);
						}
					}
				});
			}, configuration.refreshTime);
		},
		
		/**
		*	Clear the timer used for counting messages
		*/
		disposeCounting: function(){
			clearTimer(timerCount);
		},
		
		/**
		*	Clear the timer used for loading messages
		*/
		disposeLoading: function(){
			clearTimer(timerMessages);
		},
		
		/**
		*	Clear all the timers
		*/
		dispose: function(){
			clearTimer(timerCount);
			clearTimer(timerMessages);
		}
		
		/**
		*	Initialize the chat modules
		*/
		initialize: function(configurationParams){
			if(configurationParams){
				setConfigurationParameters(configurationParams);
			}
		},
})();

var Chat = ChatModule;