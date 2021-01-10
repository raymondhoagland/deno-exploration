{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell rec {
   buildInputs = with pkgs; [
    deno
    direnv
   ];
}
