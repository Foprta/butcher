//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Butcher {
    struct NFTEntity {
        address contractAddress;
        uint256 tokenId;
    }

    function sendNFTs(address _receiver, NFTEntity[] memory _tokens) public {
        for (uint16 i = 0; i < _tokens.length; i++) {
            ERC721 NFTContract = ERC721(_tokens[i].contractAddress);

            require(
                NFTContract.isApprovedForAll(msg.sender, address(this)),
                "Some contracts are not approved"
            );

            NFTContract.safeTransferFrom(
                msg.sender,
                _receiver,
                _tokens[i].tokenId
            );
        }
    }
}
