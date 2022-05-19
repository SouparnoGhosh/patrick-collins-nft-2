//SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract MultiSigWallet {
    // Events
    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    event SubmitTransaction(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        bytes data
    );
    event ConfirmTransaction(address indexed sender, uint256 indexed txIndex);
    event RevokeConfirmation(address indexed sender, uint256 indexed txIndex);
    event ExecuteTransaction(address indexed sender, uint256 indexed txIndex);

    // Variables
    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public numConfirmationsRequired;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 numConfirmations;
    }

    // txIndex => owner => confirmation of transaction
    mapping(uint256 => mapping(address => bool)) public isTransactionConfirmed;
    Transaction[] public transactions;

    // modifiers
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Must be owner");
        _;
    }

    modifier txExists(uint256 _txIndex) {
        require(_txIndex < transactions.length, "Tx doesnt exist");
        _;
    }

    modifier notConfirmed(uint256 _txIndex) {
        require(!isTransactionConfirmed[_txIndex][msg.sender], "Tx confirmed");
        _;
    }

    modifier notExecuted(uint256 _txIndex) {
        require(!transactions[_txIndex].executed, "Tx not executed");
        _;
    }
}
