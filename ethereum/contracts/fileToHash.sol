pragma solidity ^0.4.17;

contract FileHashStorage {
    mapping(string => string) fileHashes;

    // Function to store file hash
    function put(string memory filename, string memory fileHash) public {
        fileHashes[filename] = fileHash;
    }

    // Function to retrieve file hash
    function get(string memory filename) public view returns (string memory) {
        return fileHashes[filename];
    }
}
