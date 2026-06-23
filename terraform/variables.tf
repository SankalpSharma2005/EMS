variable "location" {
  type    = string
  default = "Central India"
}

variable "resource_group_name" {
  type    = string
  default = "terraform-demo-rg"
}

variable "vm_name" {
  type    = string
  default = "ems-vm"
}

variable "admin_username" {
  type    = string
  default = "azureuser"
}