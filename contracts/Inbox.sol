pragma solidity ^0.4.7;

contract Inbox {
    string public message;

    function inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
