 // SPDX-License-Identifier: MIT
                        pragma solidity ^0.8.0;

                        import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

                        contract MkToken is ERC20 {
                            constructor() ERC20("MK Token", "mk") {
                                _mint(msg.sender, 150);
                            }

                            
                        }