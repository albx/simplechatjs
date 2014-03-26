Simplechatjs provides a basic javascript module for a chat client.

To use the module include it in your page after jquery:
```
<script type="text/javascript" src="path/to/module/chat.js"></script>
```

Below you can find all the methods and properties references.

###Configuration properties

| **Option** | **Description** |
|------------|-----------------|
| **refreshTime** | is the time in ms after which the chat will refresh (Default 1000) |
| **saveMessageUrl** | is the url which will be call to save the message written |
| **loadMessageUrl** | is the url which will be call to load the chat messages |
| **countMessageUrl** | is the url which will be call to count the chat messages |
| **onMessageSaved** | is the default callback which will be called after the message saving |
| **onMessagesLoaded** | is the default callback which will be called after the messages loading |
| **onMessagesCount** | is the default callback which will be called after the messages counting |

###Methods summary

The methods for this module are the following:

- **initialize(configurationParams)**: initializes the chat module. It takes as argument an object containing all the configuration parameters.
Example:
```
Chat.initialize({
	refreshTime: 1000,
	saveMessageUrl: "/yoursite.com/api/chat/message/save",
	loadMessageUrl: "/yoursite.com/api/chat/message/load",
	countMessageUrl: "/yoursite.com/api/chat/message/count",
	onMessageSaved: function(response){
		// do some stuff after saving the message
	},
	onMessagesLoaded: function(response){
		// do some stuff after loading the messages
	},
	onMessagesCount: function(response){
		// do some stuff after counting the messages
	}
});
```

- **saveMessage(messageData, endSaving)**: saves the message written. Its arguments are:
| **Argument** | **Description** |
|--------------|-----------------|
| **messageData** | An object containing the data of the message to save |
| **endSaving** | The callback which will be called after the message saving. If not specified it uses the default callback defined in the configuration |
Example:
```
Chat.saveMessage({"my_message": "Hi guys!"}, function(response){
	// do some stuff after saving the message
});
```

- **loadMessages(chatData, endLoading)**: loads all chat messages. It takes the following arguments:
| **Argument** | **Description** |
|--------------|-----------------|
| **chatData** | An object containing the data you need to pass to the server |
| **endLoading** | The callback which will be called after the messages loading. If not specified it uses the default callback defined in the configuration |
Example:
```
Chat.loadMessages({"chat_id": 1}, function(response){
	// do some stuff after loading the messages
});
```

- **countMessages(chatData, endCounting)**: counts the chat messages. It takes the following arguments:
| **Argument** | **Description** |
|--------------|-----------------|
| **chatData** | An object containing the data you need to pass to the server |
| **endCounting** | The callback which will be called after the messages counting. If not specified it uses the default callback defined in the configuration |
Example:
```
Chat.countMessages({"chat_id": 1}, function(response){
	// do some stuff after counting the messages
});
```

- **disposeCounting**: clears the timer used for counting messages.
Example:
```
Chat.disposeCounting();
```

- **disposeLoading**: clears the timer used for loading messages.
Example:
```
Chat.disposeLoading();
```

- **dispose**: clears all the timers.
Example:
```
Chat.dispose();
```