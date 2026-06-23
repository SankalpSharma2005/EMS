output "public_ip" {
  value = azurerm_public_ip.public_ip.ip_address
}

output "vm_name" {
  value = azurerm_linux_virtual_machine.vm.name
}

output "resource_group" {
  value = azurerm_resource_group.rg.name
}