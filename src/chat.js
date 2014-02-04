var ChatModule = (function(){
	/**
	*	Configuration parameters
	*	refreshTime: is the time in ms after which the chat is reloaded. Default 1000
	*	saveMessageUrl: the url to call for saving a message
	*	loadMessageUrl: the url to call for loading the chat messages
	*	onLoadMessages: the callback that called when the messages are loaded
	*	@var object
	*/
	var configuration = {
		refreshTime: 1000,
		saveMessageUrl: "",
		loadMessageUrl: "",
		onLoadMessages: function(){}
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
	
	return {
		/**
		*	Save the message written
		*/
		saveMessage: function(messageData, successCallback){
			$.ajax({
				type: "POST",
				url: configuration.saveMessageUrl,
				data: messageData,
				success: function(response){
					successCallback(response);
				}
			});
		},
		
		/**
		*	Load all chat messages
		*/
		loadMessages: function(chatData){
			$.ajax({
				type: "POST",
				url: configuration.loadMessageUrl,
				data: chatData,
				success: function(response){
					configuration.onLoadMessages(response);
				}
			});
		},
		
		/**
		*	Initialize the chat modules
		*/
		initialize: function(chatData, configurationParams){
			if(configurationParams){
				setConfigurationParameters(configurationParams);
			}
			
			setInterval(function(){
				ChatModule.loadMessages(chatData);
			}, configuration.refreshTime);
		},
	};
})();

var Chat = ChatModule;